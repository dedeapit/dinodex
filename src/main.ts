import { initializeConfig } from './config/init'
initializeConfig()

import dbConfig from '@config/db'
import { createDatabaseConnection } from '@lib/db'
import { createContextFunction } from '@lib/server/graphql/context'
import { startServer, StartServerConfig } from '@lib/server/server'
import { createDinosaursService } from '@modules/dinosaur/services/dinosaurs.service'
import { applyMiddleware } from 'graphql-middleware'
import { Connection, ConnectionOptions } from 'typeorm'
import { createSchema, SchemaDependencies } from './schema'

const createDependencies = () => (
  connection: Connection,
): SchemaDependencies => {
  return {
    dinosaurService: createDinosaursService(connection),
  }
}

const bootstrap = async (): Promise<void> => {
  console.log(`Starting server in ${process.env.NODE_ENV} mode...`)
  const connection = await createDatabaseConnection()(
    dbConfig as ConnectionOptions,
  )

  const dependencies = createDependencies()(connection)

  const schemaWithMiddlewares = applyMiddleware(createSchema(dependencies))

  const config: StartServerConfig = {
    apolloServerConfig: {
      schema: schemaWithMiddlewares,
      context: createContextFunction({}),
      debug: false,
    },
  }

  const url = await startServer(config)

  console.log(`🚀 [${process.env.NODE_ENV}] Server ready at ${url}`)
}

bootstrap()
