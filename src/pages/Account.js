import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import AccountDetails from '../components/Account/AccountDetails';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const AccountPage = () => {
    const classes = useStyles();

    useEffect(() => {
        document.title = 'Tech Diary | Account';
    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={4}>
                <Grid item lg={8} md={6} xl={8} xs={12}>
                    <AccountDetails />
                </Grid>
            </Grid>
        </div>
    );
};

export default AccountPage;
