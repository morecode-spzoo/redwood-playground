export const schema = gql`
  type User {
    id: String!
    firstName: String!
    middleNames: String
    lastName: String!
    dateOfBirth: DateTime
    email: String!
    password: String!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    firstName: String!
    middleNames: String
    lastName: String!
    dateOfBirth: DateTime
    email: String!
    password: String!
  }

  input UpdateUserInput {
    firstName: String
    middleNames: String
    lastName: String
    dateOfBirth: DateTime
    email: String
    password: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`;
