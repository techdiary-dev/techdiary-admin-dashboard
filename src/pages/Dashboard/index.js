import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import Budget from '../../components/Dashboard/Budget';
import TotalUsers from '../../components/Dashboard/TotalUsers';
import TasksProgress from '../../components/Dashboard/TasksProgress';
import TotalProfit from '../../components/Dashboard/TotalProfit';
import LatestSales from '../../components/Dashboard/LatestSales';
import UsersByDevice from '../../components/Dashboard/UsersByDevice';
import LatestProducts from '../../components/Dashboard/LatestProducts';
import LatestOrders from '../../components/Dashboard/LatestOrders';

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
                    <Budget />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <TotalUsers />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <TasksProgress />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                    <TotalProfit />
                </Grid>
                <Grid item lg={8} md={12} xl={9} xs={12}>
                    <LatestSales />
                </Grid>
                <Grid item lg={4} md={6} xl={3} xs={12}>
                    <UsersByDevice />
                </Grid>
                <Grid item lg={4} md={6} xl={3} xs={12}>
                    <LatestProducts />
                </Grid>
                <Grid item lg={8} md={12} xl={9} xs={12}>
                    <LatestOrders />
                </Grid>
            </Grid>
        </div>
    );
};

export default DashboardPage;
