import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { ME } from '../quries/ME';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    }
}));

const PrivateRoute = (props) => {
    const { layout: Layout, component: Component, ...rest } = props;
    const { data, loading } = useQuery(ME);

    const classes = useStyles();

    if (loading)
        return (
            <Backdrop open={true} className={classes.backdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
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
