import { ApolloServer } from 'apollo-server-express'
import express from 'express'

import typeDefs from './typeDefs'
import resolvers from './resolvers'

const { APP_PORT = 4000, NODE_ENV = 'development' } = process.env

const app = express()

app.disable('x-powered-by')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: NODE_ENV !== 'production'
})

server.applyMiddleware({
  app
})

app.listen({ port: 4000 }, () => console.log('running on http://localhost:4000/graphql'))
