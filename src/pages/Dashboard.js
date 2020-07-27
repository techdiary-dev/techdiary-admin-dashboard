import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import TotalArticle from '../components/Dashboard/TotalArticle';
import TotalUser from '../components/Dashboard/TotalUser';
import TotalSession from '../components/Dashboard/TotalSession';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const DashboardPage = () => {
    const classes = useStyles();

    useEffect(() => {
        document.title = 'Tech Diary | Dashboard';
    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={4}>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <TotalArticle />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <TotalUser />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <TotalSession />
                </Grid>
            </Grid>
        </div>
    );
};

export default DashboardPage;
