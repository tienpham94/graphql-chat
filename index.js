const express = require("express")
const graphqlHTTP = require("express-graphql")
const { buildSchema } = require("graphql")
const crypto = require("crypto")

const db = {
  users: [
    { id: "1", email: "tien@mail.com", name: "Tien" },
    { id: "2", email: "tien@mail.com", name: "Tien" }
  ],
  messages: [
    { id: "1", userID: "1", body: "Hello", createdAt: Date.now() },
    { id: "2", userID: "2", body: "Hi", createdAt: Date.now() }
  ]
}

const schema = buildSchema(`
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
`)

const rootValue = {
  users: () => db.users,
  user: args => db.users.find(u => u.id === args.id),
  messages: () => db.messages,
  addUser: ({ email, name }) => {
    const user = {
      id: crypto.randomBytes(10).toString("hex"),
      name,
      email
    }
    db.users.push(user)
    return user
  }
}

const query = `
  {
    users {
      email
    }
  }
`

const app = express()

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
  })
)

app.listen(3000, () => console.log("Listening on port 3000"))

// graphql(schema, query, rootValue)
//   .then(console.log)
//   .catch(console.error)
