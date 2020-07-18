import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import Notifications from '../../components/Settings/Notifications';
import Password from '../../components/Settings/Password';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const SettingsPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={4}>
                <Grid item md={7} xs={12}>
                    <Notifications />
                </Grid>
                <Grid item md={5} xs={12}>
                    <Password />
                </Grid>
            </Grid>
        </div>
    );
};

export default SettingsPage;
