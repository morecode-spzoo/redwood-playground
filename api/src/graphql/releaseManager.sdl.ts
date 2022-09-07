export const schema = gql`
  type Query {
    #prettier-ignore
    findReleasesBetween(startDate: DateTime, endDate: DateTime): [BookRelease]
  }
`;
