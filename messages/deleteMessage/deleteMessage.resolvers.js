import { protectedResolver } from './../../users/users.utils';
import client from './../../client';

export default {
    Mutation: {
        deleteMessage: protectedResolver(async (_, { id }, { loggedInUser }) => {
            const message = await client.message.findFirst({
                where: {
                    id,
                    read: false,
                    userId: loggedInUser?.id,
                    room: {
                        users: {
                            some: {
                                id: loggedInUser?.id,
                            },
                        },
                    },
                },
            });

            if (!message) {
                return {
                    ok: false,
                    error: "Message can't Delete.",
                };
            } else if (message.userId !== loggedInUser.id) {
                return {
                    ok: false,
                    error: "Not authorized.",
                };
            } else {
                await client.message.delete({
                    where: {
                        id,
                    },
                });

                return {
                    ok: true,
                };
            }
        }),
    },
};