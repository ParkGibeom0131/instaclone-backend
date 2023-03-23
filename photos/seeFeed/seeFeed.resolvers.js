import { protectedResolver } from './../../users/users.utils';
import client from './../../client';

export default {
    Query: {
        seeFeed: protectedResolver((_, { lastId }, { loggedInUser }) => client.photo.findMany({
            where: {
                OR: [
                    {
                        user: {
                            followers: {
                                some: {
                                    id: loggedInUser.id,
                                },
                            },
                        },
                    },
                    {
                        userId: loggedInUser.id,
                    },
                ],
            },

            take: 5,
            skip: lastId ? 1 : 0,
            ...(lastId && { cursor: { id: lastId } }),

            orderBy: {
                createdAt: "desc",
            },
        }))
    },
};