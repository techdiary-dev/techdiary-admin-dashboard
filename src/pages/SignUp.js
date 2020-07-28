import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Toastr from 'toastr';

import Logo from '../utils/logo';
import { signUpSchema } from '../validationSchema/schema';
import { REGISTER_ADMIN } from '../quries/AUTH';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100%'
    },
    grid: {
        height: '100%'
    },
    logoImage: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px'
    },
    contentBody: {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        paddingLeft: 100,
        paddingRight: 100,
        flexBasis: 700,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    textField: {
        marginTop: theme.spacing(2)
    },
    signUpButton: {
        margin: theme.spacing(2, 0)
    },
    signUpBottomText: {
        display: 'flex',
        justifyContent: 'center'
    },
    errorMsg: {
        marginTop: 8,
        color: 'red'
    }
}));

const SignUpPage = () => {
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        document.title = 'Tech Diary | Sign up';
    }, []);

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(signUpSchema)
    });

    const [registerAdmin] = useMutation(REGISTER_ADMIN);

    Toastr.options = {
        closeButton: true,
        newestOnTop: true,
        progressBar: true
    };

    const onSubmit = async ({ name, username, email, password }) => {
        try {
            await registerAdmin({
                variables: {
                    name,
                    username,
                    email,
                    password
                }
            });
            Toastr.success('You have successfully signed up');
            history.push('/sign-in');
        } catch (e) {
            Toastr.error(e.networkError.result.errors[0].message);
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.grid} container>
                <div className={classes.contentBody}>
                    <form
                        className={classes.form}
                        onSubmit={handleSubmit(onSubmit)}>
                        <div className={classes.logoImage}>
                            <Logo fillColor="#2f3432" strokeColor="#000" />
                        </div>
                        <TextField
                            className={classes.textField}
                            fullWidth
                            label="Name"
                            name="name"
                            type="text"
                            variant="outlined"
                            inputRef={register}
                            error={errors?.name?.message}
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
                            className={classes.textField}
                            fullWidth
                            label="Username"
                            name="username"
                            type="text"
                            variant="outlined"
                            inputRef={register}
                            error={errors?.username?.message}
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
                            className={classes.textField}
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            variant="outlined"
                            inputRef={register}
                            error={errors?.email?.message}
                        />

                        {errors?.email?.message && (
                            <Typography
                                className={classes.errorMsg}
                                color="textSecondary"
                                gutterBottom>
                                {errors?.email?.message}
                            </Typography>
                        )}

                        <TextField
                            className={classes.textField}
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            inputRef={register}
                            error={errors?.password?.message}
                        />

                        {errors?.password?.message && (
                            <Typography
                                className={classes.errorMsg}
                                color="textSecondary"
                                gutterBottom>
                                {errors?.password?.message}
                            </Typography>
                        )}

                        <Button
                            className={classes.signUpButton}
                            color="primary"
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained">
                            Sign up
                        </Button>

                        <Typography
                            className={classes.signUpBottomText}
                            color="textSecondary"
                            variant="body1">
                            Have an account?&nbsp;
                            <Link to="/sign-in" variant="h6">
                                Sign in
                            </Link>
                        </Typography>
                    </form>
                </div>
            </div>
        </div>
    );
};

SignUpPage.propTypes = {
    history: PropTypes.object
};

export default SignUpPage;
