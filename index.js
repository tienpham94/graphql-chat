const { ApolloServer, gql } = require("apollo-server")
const crypto = require("crypto")

const db = {
  users: [
    { id: "1", email: "tien@mail.com", name: "Tien" },
    { id: "2", email: "tien@mail.com", name: "Tien" }
  ],
  messages: [
    { id: "1", userId: "1", body: "Hello", createdAt: Date.now() },
    { id: "2", userId: "2", body: "Hi", createdAt: Date.now() }
  ]
}

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User
    messages: [Message!]!
  }

  type Mutation {
    addUser(email: String!, name: String): User
  }

  type User {
    id: ID!
    email: String!
    name: String
    avatarUrl: String
    messages: [Message!]!
  }

  type Message {
    id: ID!
    body: String!
    createdAt: String
  }
`

const resolvers = {
  Query: {
    users: () => db.users,
    user: (root, args) => db.users.find(u => u.id === args.id),
    messages: () => db.messages
  },
  Mutation: {
    addUser: (root, { email, name }) => {
      const user = {
        id: crypto.randomBytes(10).toString("hex"),
        name,
        email
      }
      db.users.push(user)
      return user
    }
  },
  User: {
    messages: user => db.messages.filter(m => m.userId === user.id)
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => console.log(url))
