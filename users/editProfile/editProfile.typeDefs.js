import { gql } from "apollo-server";

export default gql`
    type Mutation {
        editProfile(
            firstName: String
            lastName: String
            username: String
            email: String
            password: String
            bio: String
            avatar: Upload
        ): MutationResponse!
    }
`;
//Upload는 Cross-Site Request Forgery(CSRF) 공격에 취약함