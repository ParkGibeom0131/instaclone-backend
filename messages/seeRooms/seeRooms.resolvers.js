import { protectedResolver } from './../../users/users.utils';
import client from './../../client';

export default {
    Query: {
        seeRooms: protectedResolver(async (_, { offset }, { loggedInUser }) => client.room.findMany({
            where: {
                users: {
                    some: {
                        id: loggedInUser.id,
                    },
                },
            },
            take: 2,
            skip: offset,
        })),
    },
};