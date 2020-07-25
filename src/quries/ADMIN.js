import { gql } from '@apollo/client';

export const ADMIN_LIST = gql`
    query ADMIN_LIST($page: Int, $limit: Int) {
        admins(pagination: { page: $page, limit: $limit }) {
            resourceCount
            pageCount
            currentPage
            data {
                _id
                name
                username
                email
                password
            }
        }
    }
`;
