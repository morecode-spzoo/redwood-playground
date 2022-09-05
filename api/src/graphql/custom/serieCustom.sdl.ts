export const schema = gql`
  type Mutation {
    #prettier-ignore
    updateSerieAddBooks(serieId: String!, books: [BookInput!]!): BookSerie @requireAuth
    #prettier-ignore
    updateSerieSetBooks(serieId: String!, books: [BookInput!]!): BookSerie @requireAuth
    #prettier-ignore
    updateSerieRemoveBooks(serieId: String!, books: [BookInput!]!): BookSerie @requireAuth
  }
`;
