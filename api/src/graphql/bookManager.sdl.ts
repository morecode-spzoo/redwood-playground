export const schema = gql`
  # be aware that one of these
  input BookInput {
    id: String! # - this is the safest way to declare the type but if there is at least one unique field present it will work
    # id: String #unique field
    idCode: String #unique field
    title: String
  }
`;
