import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Toastr from 'toastr';
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

import { createAdminSchema } from '../../validationSchema/schema';
import { CREATE_ADMIN } from '../../quries/AUTH';

const useStyles = makeStyles((theme) => ({
    errorMsg: {
        marginTop: 8,
        color: 'red'
    }
}));

const CreateAdmin = () => {
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        document.title = 'Tech Diary | Create Admin';
    }, []);

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(createAdminSchema)
    });

    const [createAdmin] = useMutation(CREATE_ADMIN);

    Toastr.options = {
        closeButton: true,
        newestOnTop: true,
        progressBar: true
    };

    const onSubmit = async ({ name, username, email, password }) => {
        try {
            await createAdmin({
                variables: {
                    name,
                    username,
                    email,
                    password
                }
            });
            Toastr.success('Successfully created a admin');
            history.push('/admins');
        } catch (e) {
            Toastr.error(e.message);
        }
    };

    return (
        <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardHeader title="Create Admin" />
                <Divider />
                <CardContent>
                    <TextField
                        fullWidth
                        margin="dense"
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
                        fullWidth
                        margin="dense"
                        label="Username"
                        name="username"
                        type="text"
                        variant="outlined"
                        style={{ marginTop: '1rem' }}
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
                        fullWidth
                        margin="dense"
                        label="Email address"
                        name="email"
                        type="text"
                        variant="outlined"
                        style={{ marginTop: '1rem' }}
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
                        fullWidth
                        margin="dense"
                        style={{ marginTop: '1rem' }}
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
                </CardContent>
                <Divider />
                <CardActions>
                    <Button
                        color="primary"
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

export default CreateAdmin;
