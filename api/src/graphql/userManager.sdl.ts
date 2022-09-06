export const schema = gql`
  type Query {
    # FIXME: Service Not Implemented bug
    # currently I cannot reproduce issue described in
    # https://community.redwoodjs.com/t/separate-generated-services-and-sdl-files-from-custom-ones/3896/8
    # renaming service and SDL funciton works as expected, this was tested on 2.2.0, playground uses 2.2.3
    seekUsersBy(firstName: String): [User]! @requireAuth
  }
`;
