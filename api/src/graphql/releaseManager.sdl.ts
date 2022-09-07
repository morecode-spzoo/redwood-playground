export const schema = gql`
  type Query {
    #prettier-ignore
    findReleasesBetween(startDate: Date, endDate: Date): [BookRelease] @requireAuth
  }
`;
