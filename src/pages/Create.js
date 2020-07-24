import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import CreateAdmin from '../components/Create/CreateAdmin';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const CreatePage = () => {
    const classes = useStyles();

    useEffect(() => {
        document.title = 'Tech Diary | Create';
    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={4}>
                <Grid item md={5} xs={12}>
                    <CreateAdmin />
                </Grid>
            </Grid>
        </div>
    );
};

export default CreatePage;
