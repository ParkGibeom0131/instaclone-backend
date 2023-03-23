import { gql } from "apollo-server-express";

export default gql`
    type LikePhotoReult {
        ok: Boolean!
        error: String
    }

    type Mutation {
        toggleLike(id: Int!): LikePhotoReult
    }
`;

