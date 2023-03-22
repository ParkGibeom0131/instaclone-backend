import client from './../../client';

export default {
    Query: {
        seeFollowing: async (_, { username, lastId }) => {
            const ok = await client.user.findUnique({
                where: { username },
                select: { id: true },
            });
            if (!ok) {
                return {
                    ok: false,
                    error: "User not found.",
                };
            }

            const following = await client.user.findUnique({ where: { username } }).following({
                take: 5,
                skip: lastId ? 1 : 0,
                ...(lastId && { cursor: { id: lastId } }),
            });
            //Cursor based pagination 특정 페이지로 바로 이동하는 것이 어려움
            //무제한 스크롤 페이지가 필요할 때 가장 좋음

            return {
                ok: true,
                following,
            };
        },
    }
};