export const schema = gql`
  type Author {
    id: String!
    idCode: String!
    penName: String
    firstName: String!
    lastName: String!
    books: [BookAuthor]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    authors: [Author!]! @requireAuth
    author(id: String!): Author @requireAuth
  }

  input CreateAuthorInput {
    idCode: String!
    penName: String
    firstName: String!
    lastName: String!
  }

  input UpdateAuthorInput {
    idCode: String
    penName: String
    firstName: String
    lastName: String
  }

  type Mutation {
    createAuthor(input: CreateAuthorInput!): Author! @requireAuth
    updateAuthor(id: String!, input: UpdateAuthorInput!): Author! @requireAuth
    deleteAuthor(id: String!): Author! @requireAuth
  }
`
