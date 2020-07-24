import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './ApolloClient';
// import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

// import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './utils/validators';
import Routes from './router/Routes';

// Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
//     draw: chartjs.draw
// });

validate.validators = {
    ...validate.validators,
    ...validators
};

export default class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <Routes />
                    </BrowserRouter>
                </ThemeProvider>
            </ApolloProvider>
        );
    }
}
