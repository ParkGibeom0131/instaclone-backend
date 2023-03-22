import client from './../../client';

export default {
    Query: {
        seeFollowers: async (_, { username, page }) => {
            const ok = await client.user.findUnique({
                where: { username },
                select: { id: true },
            });
            // where: { username }의 경우 user의 모든 데이터를 불러오기 때문에 
            // select: { id: true }를 이용하여 optimize
            if (!ok) {
                return {
                    ok: false,
                    error: "User not found.",
                };
            }
            const followers = await client.user.findUnique({ where: { username } }).followers({
                take: 5,
                skip: (page - 1) * 5,
            });
            const totalFollowers = await client.user.count({
                where: { following: { some: { username } } },
            });
            //const bFollowers = await client.user.findMany({
            //    where: {
            //        following: {
            //            some: {
            //                username,
            //            },
            //        },
            //    }
            //});
            return {
                ok: true,
                followers,
                totalPages: Math.ceil(totalFollowers / 5),
            };
        },
    },
};