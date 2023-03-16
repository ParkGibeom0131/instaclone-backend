import client from './../client';
import bcrypt from "bcrypt";

export default {
    Mutation: {
        createAccount: async (_, {
            firstName,
            lastName,
            username,
            email,
            password,
        }) => {
            // check if username or email are already on DB.
            try {
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: [
                            {
                                username,
                            },
                            {
                                email,
                            },
                        ],
                    },
                });

                // hash password
                if (existingUser) {
                    throw new Error("This username/password is already taken.");
                }
                const uglyPassword = await bcrypt.hash(password, 10);
                return client.user.create({
                    data: {
                        username,
                        email,
                        firstName,
                        lastName,
                        password: uglyPassword,
                    },
                });
            } catch (e) {
                return e;
            }

            // save and return the user 
        },
    },
};