import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import UsersTable from '../components/Users/UsersTable';
import UsersToolbar from '../components/Users/UsersToolbar';
import mockData from './data';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    }
}));

const UsersPage = () => {
    const classes = useStyles();

    const [users] = useState(mockData);

    useEffect(() => {
        document.title = 'Tech Diary | Users';
    }, []);

    return (
        <div className={classes.root}>
            <UsersToolbar />
            <div className={classes.content}>
                <UsersTable users={users} />
            </div>
        </div>
    );
};

export default UsersPage;
