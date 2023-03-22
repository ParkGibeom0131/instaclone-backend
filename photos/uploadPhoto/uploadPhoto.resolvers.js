import { protectedResolver } from './../../users/users.utils';
import client from './../../client';

export default {
    Mutation: {
        uploadPhoto: protectedResolver(
            async (_, { file, caption }, { loggedInUser }) => {
                let hashtagObjs = [];
                if (caption) {
                    // parse caption
                    const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g);
                    // get or create Hashtags
                    hashtagObjs = hashtags.map(hashtag => ({
                        where: { hashtag },
                        create: { hashtag },
                    }));
                    // save the photo with the parsed hashtags
                    // where => hashtag를 찾아주는 일을 함
                    // create => hashtag가 존재하지 않을 경우 create함
                }
                // add the photo to the hashtags
                return client.photo.create({
                    data: {
                        file,
                        caption,
                        user: {
                            connect: {
                                id: loggedInUser.id,
                            },
                        },
                        ...(hashtagObjs.length > 0 && ({
                            hashtags: {
                                connectOrCreate: hashtagObjs,
                            },
                        })),
                    },
                });
            }
        ),
    },
};