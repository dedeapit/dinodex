import { ApolloServer, Config } from 'apollo-server-express'
import express from 'express'

export interface StartServerConfig {
  apolloServerConfig: Config
}

export const startServer = async ({
  apolloServerConfig,
}: StartServerConfig): Promise<string> => {
  const server = new ApolloServer(apolloServerConfig)

  const port = process.env.PORT || 3000

  const app = express()

  server.applyMiddleware({
    app,
    cors: false,
  })

  await app.listen({ port })

  return `http://localhost:${port}${server.graphqlPath}`
}
