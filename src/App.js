import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './ApolloClient';
import { ThemeProvider } from '@material-ui/styles';
import 'react-perfect-scrollbar/dist/css/styles.css';
import theme from './theme/index';
import Routes from './router/Routes';
import './style.scss';

const App = () => {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes />
                </BrowserRouter>
            </ThemeProvider>
        </ApolloProvider>
    );
};

export default App;
