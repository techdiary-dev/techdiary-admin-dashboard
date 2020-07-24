import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { ME } from '../quries/ME';

const PrivateRoute = (props) => {
    const { layout: Layout, component: Component, ...rest } = props;
    const { data, loading } = useQuery(ME);

    if (loading)
        return (
            <div className="custom-loader">
                <span>
                    <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        timeout={3000}
                    />
                </span>
            </div>
        );

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
