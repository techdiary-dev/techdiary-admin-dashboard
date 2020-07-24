import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import Toastr from 'toastr';
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/styles';
import { useQuery, useMutation } from '@apollo/client';

import { SESSION_LIST, DELETE_SESSION } from '../quries/SESSION';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    }
}));

const SessionsPage = () => {
    useEffect(() => {
        document.title = 'Tech Diary | Sessions';
    }, []);

    const { fetchMore } = useQuery(SESSION_LIST, {
        errorPolicy: 'all'
    });

    const [deleteSessions] = useMutation(DELETE_SESSION, {
        errorPolicy: 'all'
    });

    const classes = useStyles();

    const [state] = useState({
        columns: [
            { title: 'Domain', field: 'domain' },
            { title: 'Sub', field: 'sub' },
            { title: 'Username', field: 'username' },
            {
                title: 'CreatedAt',
                field: 'createdAt',
                render: (rowData) => <Moment unix>{rowData.createdAt}</Moment>
            }
        ]
    });

    Toastr.options = {
        closeButton: true,
        newestOnTop: true,
        progressBar: true
    };

    return (
        <div className={classes.root}>
            <MaterialTable
                title="Sessions"
                columns={state.columns}
                data={(query) =>
                    new Promise(async (resolve) => {
                        const data = await fetchMore({
                            variables: {
                                page: query.page + 1,
                                limit: query.pageSize
                            }
                        });
                        resolve({
                            data: data?.data.sessions?.data,
                            page: data?.data.sessions.currentPage - 1,
                            totalCount: data?.data.sessions?.resourceCount
                        });
                    })
                }
                editable={{
                    onRowDelete: (data) => {
                        return new Promise((resolve) => {
                            deleteSessions({
                                variables: {
                                    domain: data.domain,
                                    sub: data.sub
                                }
                            }).then(() => {
                                resolve();
                                Toastr.success('Session removed successfully');
                            });
                        });
                    }
                }}
            />
        </div>
    );
};

export default SessionsPage;
