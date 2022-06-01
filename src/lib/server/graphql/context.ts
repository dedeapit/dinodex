import { Request } from 'express'
import { IncomingMessage } from 'http'

interface IncomingContext {
  req: IncomingMessage & Request
}

export interface AppContext {
  req: Request
}

interface Dependencies {}

export const createContextFunction = ({}: Dependencies) => {
  return async ({ req }: IncomingContext): Promise<AppContext> => {
    return {
      // from incoming http request
      req,
    }
  }
}
