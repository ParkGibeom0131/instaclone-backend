require("dotenv").config();
import http from "http";
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
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.authorization),
      };
    } else {
      const { connection: { context }, } = ctx;
      return {
        loggedInUser: context.loggedInUser,
      };
    }
  },
  subscriptions: {
    onConnect: async ({ authorization }) => {
      // Connection parameters
      // Connection이 이뤄지는 순간 HTTP headers를 줌
      if (!authorization) {
        throw new Error("You can't listen.");
      }
      const loggedInUser = await getUser(authorization);
      return {
        loggedInUser,
      };
    },
  },
});

const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(` 🚀 Server ready at http://localhost:${PORT}/graphql ✅`);
});
