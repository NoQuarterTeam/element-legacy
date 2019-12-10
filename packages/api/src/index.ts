import "reflect-metadata"
import "dotenv/config"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { Container } from "typedi"
import jwt from "express-jwt"

import { cors, resolverPaths, jwtAuth } from "./lib/config"
import { ErrorInterceptor } from "./lib/globalMiddleware"
import { attachLoaders } from "./lib/attachLoaders"
import { ExpressContext } from "./lib/types"
import { authChecker } from "./lib/authChecker"
import { Server } from "./lib/server"
import { createDbConnection } from "./db"

class Element extends Server {
  constructor() {
    super()
    this.init()
  }

  async init() {
    await this.setupDb()
    await this.setUpAuth()
    await this.setupApollo()
  }

  async setupDb() {
    await createDbConnection()
  }

  async setUpAuth() {
    this.app.use(jwt(jwtAuth))
    this.app.use((err: any, _: any, __: any, next: any) => {
      if (err.name === "UnauthorizedError") next()
    })
  }

  async setupApollo() {
    const schema = await buildSchema({
      authChecker,
      authMode: "null",
      container: Container,
      resolvers: [__dirname + resolverPaths],
      globalMiddlewares: [ErrorInterceptor],
    })

    const apolloServer = new ApolloServer({
      context: ({ req, res }: ExpressContext) => ({
        req,
        res,
        loaders: attachLoaders(),
      }),
      introspection: true,
      playground: true,
      schema,
    })

    apolloServer.applyMiddleware({
      cors,
      app: this.app,
    })
  }
}

new Element().start()
