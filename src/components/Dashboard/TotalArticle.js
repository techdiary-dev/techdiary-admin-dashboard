import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Skeleton from '@material-ui/lab/Skeleton';

import { TOTAL_ARTICLE } from '../../quries/ARTICLE';

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
        backgroundColor: theme.palette.success.main,
        height: 56,
        width: 56
    },
    icon: {
        height: 32,
        width: 32
    }
}));

const TotalArticle = (props) => {
    const { className, ...rest } = props;

    const classes = useStyles();

    const { data, loading } = useQuery(TOTAL_ARTICLE);

    if (loading) return <Skeleton variant="rect" height={96} />;

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
                            TOTAL ARTICLE
                        </Typography>
                        <Typography variant="h3">
                            {data?.articles.resourceCount}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <MenuBookIcon className={classes.icon} />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

TotalArticle.propTypes = {
    className: PropTypes.string
};

export default TotalArticle;
