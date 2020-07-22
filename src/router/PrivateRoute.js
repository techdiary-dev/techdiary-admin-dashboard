import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { ME } from '../quries/ME';

const PrivateRoute = (props) => {
    const { layout: Layout, component: Component, ...rest } = props;
    const { data, loading } = useQuery(ME);
    // const token = localStorage.getItem('AUTH_TOKEN');
    console.log(data);
    if (loading) return <p>Loading</p>;
    return (
        <Route
            {...rest}
            render={(matchProps) =>
                data?.getAdmin?.email ? (
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
