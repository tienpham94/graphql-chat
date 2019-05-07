export const {
  APP_PORT = 4000,
  NODE_ENV = 'development',

  DB_USERNAME = 'admin',
  DB_PASSWORD = 'password1',
  DB_PORT = '51586',
  DB_HOST = 'ds151586.mlab.com',
  DB_NAME = 'graphql-chat'
} = process.env

export const IN_PROD = NODE_ENV === 'production'
