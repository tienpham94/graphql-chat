const express = require("express")
const graphqlHTTP = require("express-graphql")
const { buildSchema } = require("graphql")
const crypto = require("crypto")

const db = {
  users: [
    { id: "1", email: "tien@mail.com", name: "Tien" },
    { id: "2", email: "tien@mail.com", name: "Tien" }
  ]
}

const schema = buildSchema(`
  type Query {
    users: [User!]!
  }

  type Mutation {
    addUser(email: String!, name: String): User
  }

  type User {
    id: ID!
    email: String!
    name: String
    avatarUrl: String
  }
`)

const rootValue = {
  users: () => db.users,
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
