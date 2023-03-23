import { gql } from "apollo-server-express";

export default gql`
    type Query {
        seeRooms(lastId: Int): [Room]
    }
`;