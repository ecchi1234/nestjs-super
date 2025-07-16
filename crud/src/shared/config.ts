import { plainToInstance } from 'class-transformer'
import { IsString, validateSync } from 'class-validator'
import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

config({ path: '.env' }) // Load environment variables from .env file

// Kiểm tra coi thử có file .env chưa

if (!fs.existsSync(path.resolve('.env'))) {
  console.error('File .env not found. Please create a .env file in the root directory.')
  process.exit(1)
}

class ConfigSchema {
  @IsString()
  DATABASE_URL: string

  @IsString()
  ACCESS_TOKEN_SECRET: string
  @IsString()
  ACCESS_TOKEN_EXPIRES_IN: string
  @IsString()
  REFRESH_TOKEN_SECRET: string
  @IsString()
  REFRESH_TOKEN_EXPIRES_IN: string
}

const configServer = plainToInstance(ConfigSchema, process.env)

const e = validateSync(configServer)

if (e.length > 0) {
  console.log('Value of environment variables is not valid')
  const errors = e.map((error) => {
    return {
      property: error.property,
      constraints: error.constraints,
      value: error.value,
    }
  })
  throw errors
}

const envConfig = configServer

export default envConfig
