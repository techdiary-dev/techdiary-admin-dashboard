import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import UsersTable from '../../components/UserList/UsersTable';
import UsersToolbar from '../../components/UserList/UsersToolbar';
import mockData from './data';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    }
}));

const UserListPage = () => {
    const classes = useStyles();

    const [users] = useState(mockData);

    return (
        <div className={classes.root}>
            <UsersToolbar />
            <div className={classes.content}>
                <UsersTable users={users} />
            </div>
        </div>
    );
};

export default UserListPage;
