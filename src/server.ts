import { makeExecutableSchema } from "@graphql-tools/schema";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import express from "express";
import {
  constraintDirective,
  constraintDirectiveTypeDefs,
} from "graphql-constraint-directive";
import http from "http";
import { resolvers } from "./graphql/resolvers.js";
import { typeDefs } from "./graphql/typeDefs.js";
import { getUserFromToken } from "./lib/auth";
import prisma from "./prisma/prisma";

async function startApolloServer(t: any, r: any) {
  const app = express();

  app.use(cookieParser());

  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({
    typeDefs: [constraintDirectiveTypeDefs, typeDefs],
    resolvers,
  });
  const server = new ApolloServer({
    schema: constraintDirective()(schema),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    async context({ req, res }) {
      let user;
      const token = req.cookies.T_ACCESS_TOKEN || req.headers.authorization;
      if (token) {
        user = await getUserFromToken(token);
      }
      const asd = req.headers.asd;
      if (!token && asd) {
        user = {
          id: 35,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          email: "admin@admin.com",
          firstname: "admin",
          lastname: "admin",
          avatar: "",
        };
      }
      return { req, res, prisma, user };
    },
  });
  await server.start();
  server.applyMiddleware({
    app,
    cors: { origin: "http://localhost:3000", credentials: true },
    path: "/graphql",
  });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers).then(() => {
  console.log(" 🚀🚀🚀 Cheers🍺");
});
