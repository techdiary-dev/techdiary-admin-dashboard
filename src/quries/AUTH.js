import { gql } from '@apollo/client';

export const LOGIN_ADMIN = gql`
  mutation LoginAdmin($identifier: String!, $password: String!) {
    loginAdmin(data: { identifier: $identifier, password: $password }) {
      token
    }
  }
`;

export const REGISTER_ADMIN = gql`
  mutation RegisterAdmin(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    registerAdmin(
      data: {
        name: $name
        username: $username
        email: $email
        password: $password
      }
    ) {
      name
    }
  }
`;
