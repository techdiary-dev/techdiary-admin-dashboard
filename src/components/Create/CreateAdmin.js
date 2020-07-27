import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import Toastr from 'toastr';
import { withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Button,
    TextField
} from '@material-ui/core';

import { CREATE_ADMIN } from '../../quries/AUTH';

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

const CreateAdmin = (props) => {
    const history = useHistory();
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
            history.push('/admins');
        } catch (e) {
            Toastr.error(e.message);
        }
    };

    const hasError = (field) =>
        formState.touched[field] && formState.errors[field] ? true : false;

    return (
        <Card>
            <form onSubmit={handleCreateAdmin}>
                <CardHeader title="Create Admin" />
                <Divider />
                <CardContent>
                    <TextField
                        fullWidth
                        margin="dense"
                        error={hasError('name')}
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
                        fullWidth
                        margin="dense"
                        error={hasError('username')}
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
                        style={{ marginTop: '1rem' }}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        error={hasError('email')}
                        helperText={
                            hasError('email') ? formState.errors.email[0] : null
                        }
                        label="Email address"
                        name="email"
                        onChange={handleChange}
                        type="text"
                        value={formState.values.email || ''}
                        variant="outlined"
                        style={{ marginTop: '1rem' }}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        error={hasError('password')}
                        helperText={
                            hasError('password')
                                ? formState.errors.password[0]
                                : null
                        }
                        style={{ marginTop: '1rem' }}
                        label="Password"
                        name="password"
                        onChange={handleChange}
                        type="password"
                        value={formState.values.password || ''}
                        variant="outlined"
                    />
                </CardContent>
                <Divider />
                <CardActions>
                    <Button
                        color="primary"
                        disabled={!formState.isValid}
                        fullWidth
                        type="submit"
                        variant="contained">
                        Create
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
};

CreateAdmin.propTypes = {
    history: PropTypes.object
};

export default withRouter(CreateAdmin);
