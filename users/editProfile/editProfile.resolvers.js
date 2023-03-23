import client from '../../client';
import bcrypt from 'bcrypt';
import { protectedResolver } from '../users.utils';
import { uploadToS3 } from '../../shared/shared.utils';

export default {
    Mutation: {
        editProfile: protectedResolver(
            // function-oriented programming 함수를 받고 함수를 리턴하는 프로그래밍
            async (_, { firstName, lastName, username, email, password: newPassword, bio, avatar }, { loggedInUser }) => {
                // context는 모든 resolver에서 접근 가능한 정보를 넣을 수 있는 object

                let avatarUrl = null;
                if (avatar) {
                    avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars");

                    // const { filename, createReadStream } = await avatar;
                    // const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
                    // const readStream = createReadStream();
                    // const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename);
                    // readStream.pipe(writeStream);
                    // avatarUrl = `http://localhost:4000/static/${newFilename}`;
                    // 서버에 파일을 저장하고 싶을 때, 근본적으로 서버에는 파일을 저장안함
                }

                let uglyPassword = null;
                if (newPassword) {
                    uglyPassword = await bcrypt.hash(newPassword, 10);
                }

                const updatedUser = await client.user.update({
                    where: {
                        id: loggedInUser.id,
                    },
                    data: {
                        firstName,
                        lastName,
                        username,
                        email,
                        bio,
                        ...(uglyPassword && { password: uglyPassword }),
                        ...(avatarUrl && { avatar: avatarUrl }),
                        // (uglyPassword is true && { return object })
                        // condition이 true일 경우 object를 리턴 => ES6 문법
                    },
                });

                if (updatedUser.id) {
                    return {
                        ok: true
                    }
                } else {
                    return {
                        ok: false,
                        error: "Could not update profile."
                    }
                }
            },
        ),
    },
};

