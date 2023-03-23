import { gql } from "apollo-server-express";

export default gql`
    type Photo {
        id: Int!
        user: User!
        file: String!
        caption: String
        likes: Int!
        comments: Int!
        hashtags: [Hashtag]
        createdAt: String!
        updatedAt: String!
        isMine: Boolean!
    }

    type Hashtag {
        id: Int!
        hashtag: String!
        photos(lastId: Int): [Photo]
        totalPhotos: Int!
        createdAt: String!
        updatedAt: String!
    }

    type Like {
        id: Int!
        photo: Photo!
        createdAt: String!
        updatedAt: String!
    }
`;
// photos(page: Int): [Photo] => Argument를 필드로 보낼 수 있음

// Hashtag 타입이 명시되어 있지 않음
// 두 가지 해결 방법

// 해당 파일 내에 type Hashtag를 만들 경우
// => Hashtag와 Photo가 얼마나 자주 상호 작용하는가?
// => 상호 작용하는 요소들이 Photo 말고 더 있는가?

// Hashtag를 별도의 모듈로 분리시킬 경우
// => Hashtag는 Photo에서도 쓰지만 Comment에서도 쓸 수 있음

// 모델 간의 의존성이 높다고 판단될 경우 