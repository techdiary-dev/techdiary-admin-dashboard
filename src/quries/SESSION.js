import { gql } from '@apollo/client';

export const SESSION_LIST = gql`
    query SESSION_LIST($page: Int, $limit: Int) {
        sessions(pagination: { page: $page, limit: $limit }) {
            resourceCount
            pageCount
            currentPage
            data {
                sub
                domain
                token
            }
        }
    }
`;

export const TOTAL_SESSION = gql`
    query TOTAL_SESSION($page: Int, $limit: Int) {
        sessions(pagination: { page: $page, limit: $limit }) {
            resourceCount
        }
    }
`;

export const DELETE_SESSION = gql`
    mutation DELETE_SESSION($domain: String!, $sub: String!) {
        removeSession(domain: $domain, sub: $sub)
    }
`;
