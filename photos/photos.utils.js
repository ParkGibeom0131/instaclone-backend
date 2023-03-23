export const processHashtags = (caption) => {
    const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g) || [];
    // parse caption
    // get or create Hashtags
    return hashtags.map(hashtag => ({
        where: { hashtag },
        create: { hashtag },

        // save the photo with the parsed hashtags
        // where => hashtag를 찾아주는 일을 함
        // create => hashtag가 존재하지 않을 경우 create함
    }));
}