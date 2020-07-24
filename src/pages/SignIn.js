import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_ADMIN } from '../quries/AUTH';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import Toastr from 'toastr';
import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Button,
    IconButton,
    TextField,
    Link,
    Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Logo from '../utils/logo';

const schema = {
    identifier: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 64
        }
    },
    password: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128
        }
    }
};

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100%'
    },
    grid: {
        height: '100%'
    },
    quoteContainer: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    quote: {
        backgroundColor: theme.palette.neutral,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    contentContainer: {},
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    contentHeader: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(5),
        paddingBototm: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    logoImage: {
        marginLeft: theme.spacing(4)
    },
    contentBody: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center'
        }
    },
    form: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 125,
        flexBasis: 700,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    title: {
        marginTop: theme.spacing(3)
    },
    socialButtons: {
        marginTop: theme.spacing(3)
    },
    socialIcon: {
        marginRight: theme.spacing(1)
    },
    sugestion: {
        marginTop: theme.spacing(2)
    },
    textField: {
        marginTop: theme.spacing(2)
    },
    signInButton: {
        margin: theme.spacing(2, 0)
    }
}));

const SignInPage = () => {
    const history = useHistory();

    const classes = useStyles();

    useEffect(() => {
        document.title = 'Tech Diary | Signin';
    }, []);

    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {}
    });

    useEffect(() => {
        const errors = validate(formState.values, schema);

        setFormState((formState) => ({
            ...formState,
            isValid: errors ? false : true,
            errors: errors || {}
        }));
    }, [formState.values]);

    const handleBack = () => {
        history.goBack();
    };

    const handleChange = (event) => {
        event.persist();

        setFormState((formState) => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]:
                    event.target.type === 'checkbox'
                        ? event.target.checked
                        : event.target.value
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true
            }
        }));
    };

    Toastr.options = {
        closeButton: true,
        newestOnTop: true,
        progressBar: true
    };

    const [loginAdmin] = useMutation(LOGIN_ADMIN);

    const { identifier, password } = formState.values;

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            const { data } = await loginAdmin({
                variables: {
                    identifier,
                    password
                }
            });
            Toastr.success('You have successfully signed in');
            history.push('/dashboard');
        } catch {
            Toastr.error('Unauthorized');
        }
    };

    const hasError = (field) =>
        formState.touched[field] && formState.errors[field] ? true : false;

    return (
        <div className={classes.root}>
            <Grid className={classes.grid} container>
                <Grid className={classes.quoteContainer} item lg={5}>
                    <div className={classes.quote}>
                        <Logo fillColor="#2f3432" strokeColor="#000" />
                    </div>
                </Grid>
                <Grid className={classes.content} item lg={7} xs={12}>
                    <div className={classes.content}>
                        <div className={classes.contentHeader}>
                            <IconButton onClick={handleBack}>
                                <ArrowBackIcon />
                            </IconButton>
                        </div>
                        <div className={classes.contentBody}>
                            <form
                                className={classes.form}
                                onSubmit={handleSignIn}>
                                <Typography
                                    className={classes.title}
                                    variant="h2">
                                    Sign in
                                </Typography>

                                <TextField
                                    className={classes.textField}
                                    error={hasError('identifier')}
                                    fullWidth
                                    helperText={
                                        hasError('identifier')
                                            ? formState.errors.identifier[0]
                                            : null
                                    }
                                    label="Username / Email address"
                                    name="identifier"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.values.identifier || ''}
                                    variant="outlined"
                                />
                                <TextField
                                    className={classes.textField}
                                    error={hasError('password')}
                                    fullWidth
                                    helperText={
                                        hasError('password')
                                            ? formState.errors.password[0]
                                            : null
                                    }
                                    label="Password"
                                    name="password"
                                    onChange={handleChange}
                                    type="password"
                                    value={formState.values.password || ''}
                                    variant="outlined"
                                />
                                <Button
                                    className={classes.signInButton}
                                    color="primary"
                                    disabled={!formState.isValid}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained">
                                    Sign in now
                                </Button>
                                <Typography
                                    color="textSecondary"
                                    variant="body1">
                                    Don't have an account?{' '}
                                    <Link
                                        component={RouterLink}
                                        to="/sign-up"
                                        variant="h6">
                                        Sign up
                                    </Link>
                                </Typography>
                            </form>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

SignInPage.propTypes = {
    history: PropTypes.object
};

export default SignInPage;
