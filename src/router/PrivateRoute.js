import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { ME } from '../quries/ME';

const PrivateRoute = (props) => {
    const { layout: Layout, component: Component, ...rest } = props;
    const { data, loading } = useQuery(ME);

    if (loading) return <p>Loading</p>;

    return (
        <Route
            {...rest}
            render={(matchProps) =>
                data?.getAdmin?.username ? (
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
