import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

import { ME } from '../../../../../quries/ME';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'fit-content'
    },
    name: {
        marginTop: theme.spacing(1)
    }
}));

const Profile = (props) => {
    const { className, ...rest } = props;

    const classes = useStyles();

    const { data } = useQuery(ME);

    return (
        <div {...rest} className={clsx(classes.root, className)}>
            <Typography className={classes.name} variant="h4">
                {data?.getAdmin.name}
            </Typography>
            <Typography variant="body2">@{data?.getAdmin.username}</Typography>
        </div>
    );
};

Profile.propTypes = {
    className: PropTypes.string
};

export default Profile;
