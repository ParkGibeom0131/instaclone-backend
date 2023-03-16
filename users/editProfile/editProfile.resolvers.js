import client from '../../client';
import bcrypt from 'bcrypt';
import { protectedResolver } from '../users.utils';

export default {
    Mutation: {
        editProfile: protectedResolver(
            // function-oriented programming 함수를 받고 함수를 리턴하는 프로그래밍
            async (_, {
                firstName,
                lastName,
                username,
                email,
                password: newPassword
            }, { loggedInUser, protectedResolver }) => {
                // context는 모든 resolver에서 접근 가능한 정보를 넣을 수 있는 object

                let uglyPassword = null;
                if (newPassword) {
                    uglyPassword = await bcrypt.hash(newPassword, 10);
                }

                const updatedUser = await client.user.update({
                    where: {
                        id: loggedInUser.id,
                    },
                    data: {
                        firstName,
                        lastName,
                        username,
                        email,
                        ...(uglyPassword && { password: uglyPassword }),
                        // (uglyPassword is true && { return object })
                        // condition이 true일 경우 object를 리턴 => ES6 문법
                    },
                });

                if (updatedUser.id) {
                    return {
                        ok: true
                    }
                } else {
                    return {
                        ok: false,
                        error: "Could not update profile."
                    }
                }
            },
        ),
    },
};

