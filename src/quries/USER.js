import { gql } from '@apollo/client';

export const USER_LIST = gql`
    query USER_LIST($page: Int, $limit: Int) {
        getAllUsers(pagination: { page: $page, limit: $limit }) {
            resourceCount
            pageCount
            currentPage
            data {
                _id
                name
                username
                email
                profilePhoto
                education
                designation
                location
                bio
                skills
                githubUID
            }
        }
    }
`;

export const TOTAL_USER = gql`
    query TOTAL_USER($page: Int, $limit: Int) {
        getAllUsers(pagination: { page: $page, limit: $limit }) {
            resourceCount
        }
    }
`;

export const USER_PROFILE = gql`
    query USER_PROFILE($username: String!) {
        profile(username: $username) {
            _id
            name
            username
            email
            profilePhoto
            education
            designation
            location
            bio
            skills
            workInfo {
                name
                designation
                startTime
                endTime
            }
            links {
                text
                link
            }
        }
    }
`;

export const UPDATE_PROFILE = gql`
    mutation UPDATE_PROFILE(
        $_id: ID!
        $name: String
        $username: String
        $email: String
        $education: String
        $designation: String
        $location: String
        $bio: String
        $links: [LinkInput!]
        $skills: [String!]
        $workInfo: [WorkInfoInput!]
    ) {
        updateUserByAdmin(
            userId: $_id
            data: {
                name: $name
                username: $username
                email: $email
                education: $education
                designation: $designation
                location: $location
                bio: $bio
                links: $links
                skills: $skills
                workInfo: $workInfo
            }
        ) {
            name
        }
    }
`;
