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
import { signInSchema } from '../validationSchema/schema';
import { LOGIN_ADMIN } from '../quries/AUTH';

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
    signInButton: {
        margin: theme.spacing(2, 0)
    },
    signInBottomText: {
        display: 'flex',
        justifyContent: 'center'
    },
    errorMsg: {
        marginTop: 8,
        color: 'red'
    }
}));

const SignInPage = () => {
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        document.title = 'Tech Diary | Sign in';
    }, []);

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(signInSchema)
    });

    const [loginAdmin] = useMutation(LOGIN_ADMIN);

    Toastr.options = {
        closeButton: true,
        newestOnTop: true,
        progressBar: true
    };

    const onSubmit = async ({ identifier, password }) => {
        try {
            await loginAdmin({
                variables: {
                    identifier,
                    password
                }
            });
            history.push('/dashboard');
            Toastr.success('You have successfully signed in');
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
                            label="Username / Email"
                            name="identifier"
                            type="text"
                            variant="outlined"
                            inputRef={register}
                            error={errors?.identifier?.message}
                        />

                        {errors?.identifier?.message && (
                            <Typography
                                className={classes.errorMsg}
                                color="textSecondary"
                                gutterBottom>
                                {errors?.identifier?.message}
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
                            className={classes.signInButton}
                            color="primary"
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained">
                            Sign in
                        </Button>

                        <Typography
                            className={classes.signInBottomText}
                            color="textSecondary"
                            variant="body1">
                            Don't have an account?&nbsp;
                            <Link to="/sign-up" variant="h6">
                                Sign up
                            </Link>
                        </Typography>
                    </form>
                </div>
            </div>
        </div>
    );
};

SignInPage.propTypes = {
    history: PropTypes.object
};

export default SignInPage;
