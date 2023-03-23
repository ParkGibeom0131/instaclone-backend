import jwt from "jsonwebtoken";
import client from './../client';

export const getUser = async (Authorization) => {
    try {
        if (!Authorization) {
            return null;
        }

        const { id } = await jwt.verify(Authorization, process.env.SECRET_KEY);
        const user = await client.user.findUnique({ where: { id } });

        if (user) {
            return user;
        } else {
            return null;
        }

    } catch {
        return null;
    }
};

export const protectedResolver = (ourResolver) => (root, args, context, info) => {
    // Currying => protectResolver 함수가 리턴하는 함수는 실행되지 않은 함수
    // info 파라미터를 통해 query를 보냈는지, mutation을 보냈는지 구분 가능
    if (!context.loggedInUser) {
        const query = info.operation.operation === "query";
        if (query) {
            return null;
        } else {
            return {
                ok: false,
                error: "Please log in to perform this action."
            };
        }
    }
    return ourResolver(root, args, context, info);
};

// Functional Programming
// export function protectedResolver(ourResolver) {
//     return function (root, args, context, info) {
//         if (!context.loggedInUser) {
//             return {
//                 ok: false,
//                 error: "Please log in to perform this action."
//             };
//         }
//         return ourResolver(root, args, context, info);
//     };
// };