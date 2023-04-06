import { gql } from "apollo-server-express";

export default gql`
    type Query {
        seeRooms(offset: Int!): [Room]
    }
`;