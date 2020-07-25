import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Toastr from 'toastr';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';

import Logo from '../../../../utils/logo';
import { ADMIN_LOGOUT } from '../../../../quries/AUTH';

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: 'none'
    },
    flexGrow: {
        flexGrow: 1
    },
    signOutButton: {
        marginLeft: theme.spacing(1)
    }
}));

const Topbar = (props) => {
    const { history } = props;
    const { className, onSidebarOpen, ...rest } = props;
    const [logout, { client }] = useMutation(ADMIN_LOGOUT);

    const classes = useStyles();

    const [notifications] = useState([]);

    Toastr.options = {
        closeButton: true,
        newestOnTop: true,
        progressBar: true
    };

    const signOutHandler = async () => {
        try {
            await logout();
            localStorage.removeItem('AUTH_TOKEN');
            client.clearStore();
            Toastr.success('You have successfully logged out');
            history.push('/sign-in');
            window.location.reload();
        } catch {
            history.push('/sign-in');
        }
    };

    return (
        <AppBar {...rest} className={clsx(classes.root, className)}>
            <Toolbar>
                <Logo fillColor="white" strokeColor="white" />
                <div className={classes.flexGrow} />
                <Hidden mdDown>
                    <IconButton color="inherit">
                        <Badge
                            badgeContent={notifications.length}
                            color="primary"
                            variant="dot">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Hidden>
                <IconButton
                    onClick={signOutHandler}
                    className={classes.signOutButton}
                    color="inherit">
                    <InputIcon />
                </IconButton>
                <Hidden lgUp>
                    <IconButton color="inherit" onClick={onSidebarOpen}>
                        <MenuIcon />
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

Topbar.propTypes = {
    className: PropTypes.string,
    onSidebarOpen: PropTypes.func
};

export default withRouter(Topbar);
