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
    Button,
    TextField,
    Typography
} from '@material-ui/core';

import { ME } from '../../quries/ME';
import { UPDATE_ADMIN } from '../../quries/AUTH';

import { profileSchema } from '../../validationSchema/schema';

const useStyles = makeStyles(() => ({
    errorMsg: {
        marginTop: 6,
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
    }, [data, loading, reset]);

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
                <CardHeader title="Profile" />
                <Divider />
                <CardContent>
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
                    <TextField
                        fullWidth
                        label="Username"
                        margin="dense"
                        name="username"
                        error={errors?.username ? true : false}
                        style={{ marginTop: '1rem' }}
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
                    <TextField
                        fullWidth
                        label="Email"
                        margin="dense"
                        name="email"
                        error={errors?.email ? true : false}
                        style={{ marginTop: '1rem' }}
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
                </CardContent>
                <Divider />
                <CardActions>
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        fullWidth>
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
