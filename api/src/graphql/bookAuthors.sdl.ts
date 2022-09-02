export const schema = gql`
  type BookAuthor {
    id: String!
    author: Author!
    book: Book!
    createdAt: DateTime!
    updatedAt: DateTime!
    authorId: String!
    bookId: String!
  }

  type Query {
    bookAuthors: [BookAuthor!]! @requireAuth
    bookAuthor(id: String!): BookAuthor @requireAuth
  }

  input CreateBookAuthorInput {
    authorId: String!
    bookId: String!
  }

  input UpdateBookAuthorInput {
    authorId: String
    bookId: String
  }

  type Mutation {
    createBookAuthor(input: CreateBookAuthorInput!): BookAuthor! @requireAuth
    updateBookAuthor(id: String!, input: UpdateBookAuthorInput!): BookAuthor!
      @requireAuth
    deleteBookAuthor(id: String!): BookAuthor! @requireAuth
  }
`
