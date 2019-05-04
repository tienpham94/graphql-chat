const express = require("express")
const graphqlHTTP = require("express-graphql")
const { buildSchema } = require("graphql")

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

  type User {
    id: ID!
    email: String!
    name: String!
    avatarUrl: String
  }
`)

const rootValue = {
  users: () => db.users
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
