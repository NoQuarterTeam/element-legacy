import "reflect-metadata"
import "dotenv/config"
import { ApolloServer } from "apollo-server-express"
const http = require("http")

import express, { Response } from "express"
import jwt from "express-jwt"
import morgan from "morgan"
import { buildSchema } from "type-graphql"
import { Container } from "typedi"

import { createDbConnection } from "./db"
import { authChecker } from "./lib/authChecker"

import { cors, PORT, resolverPaths, APP_SECRET } from "./lib/config"
import { AppRequest } from "./lib/types"
import { validateToken } from "./lib/jwt"
import console = require("console")

async function main() {
  try {
    await createDbConnection()

    const app = express()
      .use(morgan("dev"))
      .use(
        jwt({
          secret: APP_SECRET,
          credentialsRequired: false,
        }),
      )
      .use((err: any, _: any, __: any, next: any) => {
        if (err.name === "UnauthorizedError") next()
      })

    const schema = await buildSchema({
      authChecker,
      authMode: "null",
      container: Container,
      resolvers: [__dirname + resolverPaths],
    })

    const apolloServer = new ApolloServer({
      context: ({ req, res }: { req: AppRequest; res: Response }) => ({
        req,
        res,
        userId: req && req.user && req.user.id,
      }),
      subscriptions: {
        path: "/graphql",
        onConnect: (connectionParams: any) => {
          if (connectionParams.authorization) {
            return validateToken(
              connectionParams.authorization.split("Bearer ")[1],
            ).then(payload => ({ user: { id: payload.id } }))
          }

          throw new Error("Missing auth token!")
          // console.log(connectionParams)
        },
      },
      introspection: true,
      playground: true,
      schema,
    })

    apolloServer.applyMiddleware({
      app,
      cors,
    })

    const httpServer = http.createServer(app)
    apolloServer.installSubscriptionHandlers(httpServer)

    httpServer.listen({ port: PORT }, () => {
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${
          apolloServer.graphqlPath
        }`,
      )
      console.log(
        `🚀 Subscriptions ready at ws://localhost:${PORT}${
          apolloServer.subscriptionsPath
        }`,
      )
    })
  } catch (error) {
    console.log(error)
  }
}

main()
