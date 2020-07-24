import { gql } from '@apollo/client';

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
            _id
        }
    }
`;

export const CREATE_ADMIN = gql`
    mutation CREATE_ADMIN(
        $name: String!
        $username: String!
        $email: String!
        $password: String!
    ) {
        addAdmin(
            data: {
                name: $name
                username: $username
                email: $email
                password: $password
            }
        ) {
            _id
        }
    }
`;

export const UPDATE_ADMIN = gql`
    mutation UPDATE_ADMIN($name: String, $username: String, $email: String) {
        updateAdmin(data: { name: $name, username: $username, email: $email }) {
            _id
        }
    }
`;

export const LOGIN_ADMIN = gql`
    mutation LoginAdmin($identifier: String!, $password: String!) {
        loginAdmin(data: { identifier: $identifier, password: $password }) {
            token
        }
    }
`;

export const ADMIN_LOGOUT = gql`
    mutation LOGOUT {
        adminLogout
    }
`;

export const CHANGE_PASSWORD = gql`
    mutation CHANGE_PASSWORD($oldPassword: String!, $newPassword: String!) {
        changePassword(
            data: { oldPassword: $oldPassword, newPassword: $newPassword }
        )
    }
`;
