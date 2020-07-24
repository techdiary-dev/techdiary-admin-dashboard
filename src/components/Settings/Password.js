import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Toastr from 'toastr';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { useMutation } from '@apollo/client';
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

import { passwordSchema } from '../../validationSchema/schema';
import { CHANGE_PASSWORD } from '../../quries/AUTH';

const useStyles = makeStyles(() => ({
    errorMsg: {
        marginTop: 6,
        color: 'red'
    }
}));

const Password = (props) => {
    const { className, ...rest } = props;

    const classes = useStyles();

    const { register, handleSubmit, getValues, errors } = useForm({
        resolver: yupResolver(passwordSchema)
    });

    const [changePassword] = useMutation(CHANGE_PASSWORD);

    Toastr.options = {
        closeButton: true,
        newestOnTop: true,
        progressBar: true
    };

    const [error, setError] = useState(false);

    const changeHandler = () => {
        const newPasswordValue = getValues('newPassword');
        const confirmNewPasswordValue = getValues('confirmNewPassword');

        if (newPasswordValue === '' || confirmNewPasswordValue === '') {
            setError(false);
        } else if (newPasswordValue !== confirmNewPasswordValue) {
            setError(true);
        } else {
            setError(false);
        }
    };

    const onSubmit = async ({ currentPassword, newPassword }) => {
        try {
            await changePassword({
                variables: {
                    oldPassword: currentPassword,
                    newPassword
                }
            });
            Toastr.success('Successfully changed the password');
        } catch (e) {
            Toastr.error('Your current password is wrong');
        }
    };

    return (
        <Card {...rest}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardHeader title="Update Password" />
                <Divider />
                <CardContent>
                    <TextField
                        fullWidth
                        label="Current Password"
                        name="currentPassword"
                        type="password"
                        variant="outlined"
                        inputRef={register}
                        error={errors?.newPassword?.message}
                    />
                    {errors?.oldPassword?.message && (
                        <Typography
                            className={classes.errorMsg}
                            color="textSecondary"
                            gutterBottom>
                            {errors?.oldPassword?.message}
                        </Typography>
                    )}
                    <TextField
                        fullWidth
                        label="New Password"
                        name="newPassword"
                        style={{ marginTop: '1rem' }}
                        type="password"
                        variant="outlined"
                        inputRef={register}
                        onChange={changeHandler}
                        error={errors?.newPassword?.message}
                    />
                    {errors?.newPassword?.message && (
                        <Typography
                            className={classes.errorMsg}
                            color="textSecondary"
                            gutterBottom>
                            {errors?.newPassword?.message}
                        </Typography>
                    )}
                    <TextField
                        fullWidth
                        label="Confirm New Password"
                        name="confirmNewPassword"
                        style={{ marginTop: '1rem' }}
                        type="password"
                        variant="outlined"
                        inputRef={register}
                        onChange={changeHandler}
                        error={errors?.newPassword?.message}
                    />
                    {errors?.confirmNewPassword?.message && (
                        <Typography
                            className={classes.errorMsg}
                            color="textSecondary"
                            gutterBottom>
                            {errors?.confirmNewPassword?.message}
                        </Typography>
                    )}
                    {error && (
                        <Typography
                            className={classes.errorMsg}
                            color="textSecondary"
                            gutterBottom>
                            New password and Confirm new password doesn't match
                        </Typography>
                    )}
                </CardContent>
                <Divider />
                <CardActions>
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        fullWidth
                        disabled={error}>
                        Update
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
};

Password.propTypes = {
    className: PropTypes.string
};

export default Password;
