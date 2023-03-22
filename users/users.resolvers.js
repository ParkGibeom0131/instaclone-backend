// 인스타그램은 followers, following의 수가 너무 많아질 수 있기 때문에 실시간으로 세지 않음.
// => Eventual Consistency를 사용함. 

import client from './../client';

export default {
    // Computed Fields
    // 데이터베이스가 아닌 schema에 fields를 만드는 방법 
    User: {
        totalFollowing: ({ id }) => client.user.count({
            // root는 requerst된 user
            // GraphQL이 자동으로 await 해줌
            where: {
                followers: {
                    some: {
                        id,
                    },
                },
            },
        }),

        totalFollowers: ({ id }) => client.user.count({
            where: {
                following: {
                    some: {
                        id,
                    },
                },
            },
        }),

        isMe: ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return false;
            }
            return id === loggedInUser.id;
        },

        isFollowing: async ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return false;
            }

            //const exists = await client.user
            //    .findUnique({ where: { username: loggedInUser.username } })
            //    .following({
            //        where: {
            //            id,
            //        },
            //    });

            const exists = await client.user.count({
                where: {
                    username: loggedInUser.username,
                    following: {
                        some: {
                            id,
                        },
                    },
                },
            });

            return Boolean(exists);
        },
    },
};