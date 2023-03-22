import { gql } from "apollo-server-express";

export default gql`
    type FollowUserReault{
        ok: Boolean!
        error: String
    }

    type Mutation {
        followUser(username: String): FollowUserReault
    }
`;