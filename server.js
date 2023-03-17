require("dotenv").config();
import express from "express";
import logger from 'morgan';
import { ApolloServer } from "apollo-server-express";
// GraphQL API를 쓸 수도 있지만, Rest API, socket IO를 실시간으로 다룰 수 있기 때문에
// 포털 서버로는 할 수 없음 => Express 서버를 만드는데 Express Server에 Apollo Server를 추가
// apollo-server-express 사용
import { typeDefs, resolvers } from "./schema";
import { getUser } from './users/users.utils';

const PORT = process.env.PORT;

const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.authorization),
    };
  },
});

const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));
app.listen({ port: PORT }, () => {
  console.log(` 🚀 Server ready at http://localhost:${PORT}/graphql ✅`);
});
