import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Button,
    TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {}
}));

const Password = (props) => {
    const { className, ...rest } = props;

    const classes = useStyles();

    const [values, setValues] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            <form>
                <CardHeader subheader="Update Password" />
                <Divider />
                <CardContent>
                    <TextField
                        fullWidth
                        label="Old Password"
                        name="oldPassword"
                        onChange={handleChange}
                        type="oldPassword"
                        value={values.oldPassword}
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="New Password"
                        name="newPassword"
                        onChange={handleChange}
                        style={{ marginTop: '1rem' }}
                        type="newPassword"
                        value={values.newPassword}
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Confirm New Password"
                        name="confirmNewPassword"
                        onChange={handleChange}
                        style={{ marginTop: '1rem' }}
                        type="confirmNewPassword"
                        value={values.confirmNewPassword}
                        variant="outlined"
                    />
                </CardContent>
                <Divider />
                <CardActions>
                    <Button color="primary" variant="outlined">
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
