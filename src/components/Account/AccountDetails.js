import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField
} from '@material-ui/core';

import { ME } from '../../quries/ME';

const useStyles = makeStyles(() => ({
    root: {}
}));

const AccountDetails = (props) => {
    const { className, ...rest } = props;

    const classes = useStyles();

    const { data } = useQuery(ME);

    const [values, setValues] = useState({
        name: data?.getAdmin.name,
        username: data?.getAdmin.username,
        email: data?.getAdmin.email
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            <form autoComplete="off" noValidate>
                <CardHeader
                    subheader="The information can be edited"
                    title="Profile"
                />
                <Divider />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                helperText="Please specify the name"
                                label="Name"
                                margin="dense"
                                name="name"
                                onChange={handleChange}
                                required
                                value={values.name}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                helperText="Please specify the username"
                                label="Username"
                                margin="dense"
                                name="username"
                                onChange={handleChange}
                                required
                                value={values.username}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                margin="dense"
                                name="email"
                                onChange={handleChange}
                                required
                                value={values.email}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button color="primary" variant="contained">
                        Save details
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
};

AccountDetails.propTypes = {
    className: PropTypes.string
};

export default AccountDetails;
