import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_URL,
    credentials: 'include'
});

// const authLink = setContext((req, context) => {
//     // const token = localStorage.getItem('AUTH_TOKEN');
//     console.log('req', req);
//     console.log('context', context);
//     return {
//         headers: {
//             ...context.headers,
//             cookie: context?.headers?.cookie
//         }
//     };
// });

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    credentials: 'include'
});
