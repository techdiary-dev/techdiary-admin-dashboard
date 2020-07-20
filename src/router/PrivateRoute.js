import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = (props) => {
    const { layout: Layout, component: Component, ...rest } = props;

    const token = localStorage.getItem('AUTH_TOKEN');

    return (
        <Route
            {...rest}
            render={(matchProps) =>
                token ? (
                    <Layout>
                        <Component {...matchProps} />
                    </Layout>
                ) : (
                    <Redirect to="/sign-in" />
                )
            }
        />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.any.isRequired,
    layout: PropTypes.any.isRequired,
    path: PropTypes.string
};

export default PrivateRoute;
