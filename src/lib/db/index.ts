import { Connection, ConnectionOptions, createConnection } from 'typeorm'

/**
 * Attempts to connect to the database, given the options.
 * Retries up to 5 times before throwing an error.
 *
 * @param options The TypeORM connection options.
 */
export const createDatabaseConnection = () => async (
  options: ConnectionOptions,
): Promise<Connection> => {
  let retries = 5
  while (retries > 0) {
    try {
      console.log('Connecting to the database...')

      return await createConnection(options)
    } catch (error) {
      console.log(`Connect database: ${error.message}`)

      retries -= 1

      // eslint-disable-next-line no-console
      console.log(`Connect database: Retries ${retries}...`)

      // wait 5 seconds
      await new Promise(resolve => setTimeout(resolve, 5000))
    }
  }

  throw new Error('Could not connect to database')
}
