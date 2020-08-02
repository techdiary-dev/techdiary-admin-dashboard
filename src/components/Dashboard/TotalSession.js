import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';

import { TOTAL_SESSION } from '../../quries/SESSION';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%'
    },
    content: {
        alignItems: 'center',
        display: 'flex'
    },
    title: {
        fontWeight: 700
    },
    avatar: {
        backgroundColor: theme.palette.error.main,
        height: 56,
        width: 56
    },
    icon: {
        height: 32,
        width: 32
    }
}));

const TotalSession = (props) => {
    const { className, ...rest } = props;

    const classes = useStyles();

    const { data } = useQuery(TOTAL_SESSION);

    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            <CardContent>
                <Grid container justify="space-between">
                    <Grid item>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                            variant="body2">
                            TOTAL SESSION
                        </Typography>
                        <Typography variant="h3">
                            {data?.sessions.resourceCount}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <PeopleIcon className={classes.icon} />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

TotalSession.propTypes = {
    className: PropTypes.string
};

export default TotalSession;
