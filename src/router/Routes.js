import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { Main as MainLayout, Minimal as MinimalLayout } from '../layouts';

import {
    Dashboard,
    Create,
    Articles,
    EditArticle,
    Users,
    EditUser,
    Sessions,
    Account,
    Settings,
    SignUp,
    SignIn,
    NotFound
} from '../pages';

const Routes = () => {
    return (
        <Switch>
            <Redirect exact from="/" to="/dashboard" />
            <PrivateRoute
                component={Dashboard}
                exact
                layout={MainLayout}
                path="/dashboard"
            />
            <PrivateRoute
                component={Create}
                exact
                layout={MainLayout}
                path="/create"
            />
            <PrivateRoute
                component={Articles}
                exact
                layout={MainLayout}
                path="/articles"
            />
            <PrivateRoute
                component={EditArticle}
                exact
                layout={MainLayout}
                path="/articles/edit/:_id"
            />
            <PrivateRoute
                component={Users}
                exact
                layout={MainLayout}
                path="/users"
            />
            <PrivateRoute
                component={EditUser}
                exact
                layout={MainLayout}
                path="/users/edit/:_id"
            />
            <PrivateRoute
                component={Sessions}
                exact
                layout={MainLayout}
                path="/sessions"
            />
            <PrivateRoute
                component={Account}
                exact
                layout={MainLayout}
                path="/account"
            />
            <PrivateRoute
                component={Settings}
                exact
                layout={MainLayout}
                path="/settings"
            />
            <Route
                component={SignUp}
                exact
                layout={MinimalLayout}
                path="/sign-up"
            />
            <Route
                component={SignIn}
                exact
                layout={MinimalLayout}
                path="/sign-in"
            />
            <PrivateRoute
                component={NotFound}
                exact
                layout={MinimalLayout}
                path="/not-found"
            />
            <Redirect from="*" to="/not-found" />
        </Switch>
    );
};

export default Routes;
