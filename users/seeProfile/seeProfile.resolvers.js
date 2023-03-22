import client from '../../client';

export default {
    Query: {
        seeProfile: (_, { username }) =>
            client.user.findUnique({
                where: {
                    username,
                },
                //include: {
                //    following: true,
                //    followers: true,
                //},
                // include를 통해서도 가능하지만, 데이터 양이 커질수록 비효율적 => pagination 사용
            }),
    },
};