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
                githubUID
                education
                designation
                location
                bio
                links {
                    text
                    link
                }
                workInfo {
                    name
                    designation
                    startTime
                    endTime
                }
                skills
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
