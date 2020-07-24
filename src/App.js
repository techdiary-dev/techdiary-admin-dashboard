import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './ApolloClient';
import { createBrowserHistory } from 'history';
// import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

// import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './utils/validators';
import Routes from './router/Routes';

const browserHistory = createBrowserHistory();

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
                    <Router history={browserHistory}>
                        <Routes />
                    </Router>
                </ThemeProvider>
            </ApolloProvider>
        );
    }
}
