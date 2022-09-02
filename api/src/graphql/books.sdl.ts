export const schema = gql`
  type Book {
    id: String!
    idCode: String!
    title: String!
    series: String
    authors: [BookAuthor]!
    releases: [BookRelease]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    books: [Book!]! @requireAuth
    book(id: String!): Book @requireAuth
  }

  input CreateBookInput {
    idCode: String!
    title: String!
    series: String
  }

  input UpdateBookInput {
    idCode: String
    title: String
    series: String
  }

  type Mutation {
    createBook(input: CreateBookInput!): Book! @requireAuth
    updateBook(id: String!, input: UpdateBookInput!): Book! @requireAuth
    deleteBook(id: String!): Book! @requireAuth
  }
`
