import client from './../../client';

export default {
    Query: {
        seePhotoLikes: async (_, { id }) => {
            const likes = await client.like.findMany({
                where: {
                    photoId: id,
                },
                select: {
                    user: true,
                },
            });
            return likes.map(like => like.user);
        }
    },
};

// include는 결과에 relationship을 추가
// select는 받고 싶은 데이터를 선택
// 두 개를 같은 레벨에서 같이 쓸 수 없음
// 