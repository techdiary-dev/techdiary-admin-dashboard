import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const SettingsPage = () => {
    const classes = useStyles();

    useEffect(() => {
        document.title = 'Tech Diary | Settings';
    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={4}>
                <Grid item md={5} xs={12}>
                    <h2>Settings Page</h2>
                </Grid>
            </Grid>
        </div>
    );
};

export default SettingsPage;
