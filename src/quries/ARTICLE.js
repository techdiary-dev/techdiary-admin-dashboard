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
                body
                thumbnail
                author {
                    name
                    username
                }
            }
        }
    }
`;

export const FEATURED_ARTICLE_LIST = gql`
    query FEATURED_ARTICLE_LIST($page: Int, $limit: Int) {
        featuredArticles(pagination: { page: $page, limit: $limit }) {
            resourceCount
            pageCount
            currentPage
            data {
                title
                thumbnail
                url
                author {
                    name
                }
            }
        }
    }
`;

export const PINNED_ARTICLE_LIST = gql`
    query PINNED_ARTICLE_LIST($page: Int, $limit: Int) {
        pinnedArticles(pagination: { page: $page, limit: $limit }) {
            resourceCount
            pageCount
            currentPage
            data {
                title
                thumbnail
                url
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
            isFeatured
            isPinned
            seriesName
        }
    }
`;

export const UPDATE_ARTICLE = gql`
    mutation UPDATE_ARTICLE(
        $_id: ID!
        $title: String
        $body: String
        $tags: [String!]
        $isPublished: Boolean
        $isFeatured: Boolean
        $isPinned: Boolean
        $thumbnail: String
        $seriesName: String
    ) {
        updateArticle(
            _id: $_id
            data: {
                title: $title
                body: $body
                tags: $tags
                isPublished: $isPublished
                isFeatured: $isFeatured
                isPinned: $isPinned
                thumbnail: $thumbnail
                seriesName: $seriesName
            }
        ) {
            _id
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
