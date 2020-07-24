import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Toastr from 'toastr';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { useQuery, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField,
    Typography
} from '@material-ui/core';

import { ME } from '../../quries/ME';
import { UPDATE_ADMIN } from '../../quries/AUTH';

import { profileSchema } from '../../validationSchema/schema';

const useStyles = makeStyles(() => ({
    errorMsg: {
        marginTop: 4,
        color: 'red'
    }
}));

const AccountDetails = (props) => {
    const { className, ...rest } = props;

    const classes = useStyles();

    const { register, handleSubmit, errors, reset } = useForm({
        resolver: yupResolver(profileSchema)
    });

    const { data, loading } = useQuery(ME);
    const [updateAdmin] = useMutation(UPDATE_ADMIN);

    useEffect(() => {
        const getAdminData = {
            ...data?.getAdmin
        };
        reset(getAdminData);
    }, [data, loading]);

    Toastr.options = {
        closeButton: true,
        newestOnTop: true,
        progressBar: true
    };

    const onSubmit = ({ name, username, email }) => {
        updateAdmin({
            variables: {
                name,
                username,
                email
            }
        });
        Toastr.success('Update profile successfully');
    };

    return (
        <Card {...rest}>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                                label="Name"
                                margin="dense"
                                name="name"
                                error={errors?.name ? true : false}
                                inputRef={register}
                                variant="outlined"
                            />
                            {errors?.name?.message && (
                                <Typography
                                    className={classes.errorMsg}
                                    color="textSecondary"
                                    gutterBottom>
                                    {errors?.name?.message}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Username"
                                margin="dense"
                                name="username"
                                error={errors?.username ? true : false}
                                inputRef={register}
                                variant="outlined"
                            />
                            {errors?.username?.message && (
                                <Typography
                                    className={classes.errorMsg}
                                    color="textSecondary"
                                    gutterBottom>
                                    {errors?.username?.message}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                margin="dense"
                                name="email"
                                error={errors?.email ? true : false}
                                inputRef={register}
                                variant="outlined"
                            />
                            {errors?.email?.message && (
                                <Typography
                                    className={classes.errorMsg}
                                    color="textSecondary"
                                    gutterBottom>
                                    {errors?.email?.message}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button color="primary" variant="contained" type="submit">
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
