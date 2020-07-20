import { gql } from '@apollo/client';

export const ARTICLE_LIST = gql`
    query ARTICLE_LIST($page: Int, $limit: Int) {
        articles(pagination: { page: $page, limit: $limit }) {
            resourceCount
            pageCount
            currentPage
            data {
                _id
                title
                slug
                body
                thumbnail
                tags
                author {
                    name
                }
            }
        }
    }
`;

export const TOTAL_ARTICLE = gql`
    query TOTAL_ARTICLE($page: Int, $limit: Int) {
        articles(pagination: { page: $page, limit: $limit }) {
            resourceCount
        }
    }
`;

export const GET_ARTICLE = gql`
    query GET_ARTICLE($_id: ID, $slug: String) {
        article(idOrSlug: { _id: $_id, slug: $slug }) {
            _id
            title
            body
            tags
            thumbnail
            isPublished
            seriesName
        }
    }
`;

export const UPDATE_ARTICLE = gql`
    mutation UPDATE_ARTICLE($_id: ID!, $body: String) {
        updateArticle(_id: $_id, data: { body: $body }) {
            _id
            body
        }
    }
`;

export const DELETE_ARTICLE = gql`
    mutation DELETE_ARTICLE($_id: ID!) {
        deleteArticle(_id: $_id) {
            _id
        }
    }
`;
