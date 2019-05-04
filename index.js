const { graphql, buildSchema } = require("graphql")

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

graphql(schema, query, rootValue)
  .then(console.log)
  .catch(console.error)
