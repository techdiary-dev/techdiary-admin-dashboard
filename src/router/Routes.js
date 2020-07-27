import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import MainLayout from '../layouts/Main';
import MinimalLayout from '../layouts/Minimal';

import {
    Dashboard,
    Create,
    Articles,
    FeaturedArticles,
    PinnedArticles,
    EditArticle,
    Users,
    EditUser,
    Admins,
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
                path="/create-admin"
            />
            <PrivateRoute
                component={Articles}
                exact
                layout={MainLayout}
                path="/articles"
            />
            <PrivateRoute
                component={FeaturedArticles}
                exact
                layout={MainLayout}
                path="/featured-articles"
            />
            <PrivateRoute
                component={PinnedArticles}
                exact
                layout={MainLayout}
                path="/pinned-articles"
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
                path="/users/edit/:username/:_id"
            />
            <PrivateRoute
                component={Admins}
                exact
                layout={MainLayout}
                path="/admins"
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
