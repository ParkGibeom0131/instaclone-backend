import { protectedResolver } from './../../users/users.utils';
import client from './../../client';

export default {
    Query: {
        seeRooms: protectedResolver(async (_, { lastId }, { loggedInUser }) => client.room.findMany({
            where: {
                users: {
                    some: {
                        id: loggedInUser.id,
                    },
                },
            },
            take: 5,
            skip: lastId ? 1 : 0,
            ...(lastId && { cursor: { id: lastId } }),
        })),
    },
};