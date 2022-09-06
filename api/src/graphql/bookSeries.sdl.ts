export const schema = gql`
  type BookSerie {
    id: String!
    idCode: String!
    title: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    books: [Book]!
  }

  type Query {
    bookSeries: [BookSerie!]! @requireAuth
    bookSerie(id: String!): BookSerie @requireAuth
  }

  input CreateBookSerieInput {
    idCode: String!
    title: String!
  }

  input UpdateBookSerieInput {
    idCode: String
    title: String
    books: [BookInput]
  }

  type Mutation {
    createBookSerie(input: CreateBookSerieInput!): BookSerie! @requireAuth
    updateBookSerie(id: String!, input: UpdateBookSerieInput!): BookSerie!
      @requireAuth
    deleteBookSerie(id: String!): BookSerie! @requireAuth
  }
`;
