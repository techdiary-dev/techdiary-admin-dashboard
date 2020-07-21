import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import SessionsTable from '../components/Sessions/SessionsTable';
import SessionsToolbar from '../components/Sessions/SessionsToolbar';
import mockData from './data';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    }
}));

const SessionsPage = () => {
    const classes = useStyles();

    const [users] = useState(mockData);

    useEffect(() => {
        document.title = 'Tech Diary | Users';
    }, []);

    return (
        <div className={classes.root}>
            <SessionsToolbar />
            <div className={classes.content}>
                <SessionsTable users={users} />
            </div>
        </div>
    );
};

export default SessionsPage;
