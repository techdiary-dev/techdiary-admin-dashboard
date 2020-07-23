import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
    uri:
        process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_API_URL
            : 'http://localhost:4545',
    credentials: 'include'
});

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    credentials: 'include'
});
