import zod from 'zod'
import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

config({ path: '.env' }) // Load environment variables from .env file

// Kiểm tra coi thử có file .env chưa

if (!fs.existsSync(path.resolve('.env'))) {
  console.error('File .env not found. Please create a .env file in the root directory.')
  process.exit(1)
}

const configSchema = zod.object({
  DATABASE_URL: zod.string(),
  ACCESS_TOKEN_SECRET: zod.string(),
  ACCESS_TOKEN_EXPIRES_IN: zod.string(),
  REFRESH_TOKEN_SECRET: zod.string(),
  REFRESH_TOKEN_EXPIRES_IN: zod.string(),
  SECRET_API_KEY: zod.string(),
})

const configServer = configSchema.safeParse(process.env)

if (!configServer.success) {
  console.log('Value of environment variables is not valid')
  console.error(configServer.error)
  process.exit(1)
}

const envConfig = configServer.data

export default envConfig
