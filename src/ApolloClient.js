import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri:
        process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_API_URL
            : 'http://localhost:4545',
    credentials: 'include'
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('AUTH_TOKEN');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});
