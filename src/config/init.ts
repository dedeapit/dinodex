import * as dotenv from 'dotenv'

export const initializeConfig = () => {
  dotenv.config()

  let path
  switch (process.env.NODE_ENV) {
    case 'development':
      path = `${__dirname}/../../.dev.env`
      break
    default:
      path = null
  }

  if (!path) return
  dotenv.config({ path })
}
