import pubsub from './../../pubsub';
import { NEW_MESSAGE } from './../../constants';
import { withFilter } from 'apollo-server-express';
import client from './../../client';

export default {
    Subscription: {
        // Subscription: 
        // 큰 규모의 object에 작지만 계속적으로 증가하는 변화가 있을 때,
        // 저지연의 실시간 업데이트를 할 때 사용하기 적합(채팅 어플리케이션)
        roomUpdates: {
            // pubsub engine, asyncIterator가 trigger들을 listen하게 됨

            subscribe: async (root, args, context, info) => {
                const room = await client.room.findFirst({
                    where: {
                        id: args.id,
                        users: {
                            // 3. user가 해당 room을 listening할 수 있는 사람인지(대화방의 참여자가 맞는지) 확인
                            some: {
                                id: context.loggedInUser.id,
                            },
                        },
                    },
                    select: {
                        id: true,
                    },
                });
                if (!room) {
                    // 2. room의 존재 유무를 확인하고, 만약 room이 존재할 경우, listening을 시작
                    // Subscription에 null을 return할 수 없음
                    throw new Error("You shall not see this.");
                }
                return withFilter(
                    // 1. user가 listening 하고 있는 roomId에 해당하는 메세지만 볼 수 있게함
                    () => pubsub.asyncIterator(NEW_MESSAGE),
                    async ({ roomUpdates }, { id }, { loggedInUser }) => {
                        if (roomUpdates.roomId === id) {
                            // listening 이후의 check, 여기서 굳이 필요하진 않을 듯 하지만,
                            // 다양한 방면의 protect가 가능함
                            const room = await client.room.findFirst({
                                where: {
                                    id,
                                    users: {
                                        // 3. user가 해당 room을 listening할 수 있는 사람인지(대화방의 참여자가 맞는지) 확인
                                        some: {
                                            id: loggedInUser.id,
                                        },
                                    },
                                },
                                select: {
                                    id: true,
                                },
                            });
                            if (!room) {
                                return false;
                            }
                            return true;
                        }
                    },
                )(root, args, context, info);
                // function을 return
            }
        },
    },
};