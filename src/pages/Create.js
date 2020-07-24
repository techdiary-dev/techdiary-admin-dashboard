import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import Toastr from 'toastr';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button, TextField, Typography } from '@material-ui/core';

import { CREATE_ADMIN } from '../quries/AUTH';

const schema = {
    name: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 32
        }
    },
    username: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 32
        }
    },
    email: {
        presence: { allowEmpty: false, message: 'is required' },
        email: true,
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
        padding: theme.spacing(3)
    },
    grid: {
        height: '100%'
    },
    form: {
        paddingBottom: 125,
        flexBasis: 700,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    textField: {
        marginTop: theme.spacing(2)
    },
    createButton: {
        margin: theme.spacing(2, 0)
    }
}));

const CreatePage = (props) => {
    const classes = useStyles();

    useEffect(() => {
        document.title = 'Tech Diary | Signup';
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

    const [createAdmin] = useMutation(CREATE_ADMIN);

    const { name, username, email, password } = formState.values;

    const handleCreateAdmin = async (e) => {
        e.preventDefault();

        try {
            await createAdmin({
                variables: {
                    name,
                    username,
                    email,
                    password
                }
            });
            setFormState({
                isValid: false,
                values: {},
                touched: {},
                errors: {}
            });
            Toastr.success('Successfully created a admin');
        } catch (e) {
            Toastr.error(e.message);
        }
    };

    const hasError = (field) =>
        formState.touched[field] && formState.errors[field] ? true : false;

    return (
        <Grid className={classes.root} item lg={7} xs={12}>
            <form className={classes.form} onSubmit={handleCreateAdmin}>
                <Typography className={classes.title} variant="h2">
                    Create Admin
                </Typography>
                <TextField
                    className={classes.textField}
                    error={hasError('name')}
                    fullWidth
                    helperText={
                        hasError('name') ? formState.errors.name[0] : null
                    }
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.name || ''}
                    variant="outlined"
                />
                <TextField
                    className={classes.textField}
                    error={hasError('username')}
                    fullWidth
                    helperText={
                        hasError('username')
                            ? formState.errors.username[0]
                            : null
                    }
                    label="Username"
                    name="username"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.username || ''}
                    variant="outlined"
                />
                <TextField
                    className={classes.textField}
                    error={hasError('email')}
                    fullWidth
                    helperText={
                        hasError('email') ? formState.errors.email[0] : null
                    }
                    label="Email address"
                    name="email"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.email || ''}
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
                    className={classes.createButton}
                    color="primary"
                    disabled={!formState.isValid}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained">
                    Create
                </Button>
            </form>
        </Grid>
    );
};

CreatePage.propTypes = {
    history: PropTypes.object
};

export default withRouter(CreatePage);
