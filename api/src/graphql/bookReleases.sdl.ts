export const schema = gql`
  type BookRelease {
    id: String!
    releaseDate: DateTime!
    releaseTitle: String
    publisher: String!
    coverType: String
    releaseInfo: String
    country: String
    language: String
    book: Book
    createdAt: DateTime!
    updatedAt: DateTime!
    bookId: String
  }

  type Query {
    bookReleases: [BookRelease!]! @requireAuth
    bookRelease(id: String!): BookRelease @requireAuth
  }

  input CreateBookReleaseInput {
    releaseDate: DateTime!
    releaseTitle: String
    publisher: String!
    coverType: String
    releaseInfo: String
    country: String
    language: String
    bookId: String
  }

  input UpdateBookReleaseInput {
    releaseDate: DateTime
    releaseTitle: String
    publisher: String
    coverType: String
    releaseInfo: String
    country: String
    language: String
    bookId: String
  }

  type Mutation {
    createBookRelease(input: CreateBookReleaseInput!): BookRelease! @requireAuth
    updateBookRelease(
      id: String!
      input: UpdateBookReleaseInput!
    ): BookRelease! @requireAuth
    deleteBookRelease(id: String!): BookRelease! @requireAuth
  }
`
