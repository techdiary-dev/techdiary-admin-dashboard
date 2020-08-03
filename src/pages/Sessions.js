import React, { useState, useEffect, createRef } from 'react';
import { useHistory } from 'react-router-dom';
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
    const tableRef = createRef();
    const history = useHistory();

    useEffect(() => {
        document.title = 'Tech Diary | Sessions';
    }, []);

    const { fetchMore } = useQuery(SESSION_LIST, {
        fetchPolicy: 'cache-only',
        errorPolicy: 'all'
    });

    const [deleteSessions] = useMutation(DELETE_SESSION, {
        errorPolicy: 'all'
    });

    const classes = useStyles();

    const [state] = useState({
        columns: [
            { title: 'Domain', field: 'domain' },
            { title: 'Username', field: 'username' },
            { title: 'Sub', field: 'sub' },
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
                tableRef={tableRef}
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
                        return new Promise(async (resolve, reject) => {
                            try {
                                await deleteSessions({
                                    variables: {
                                        domain: data.domain,
                                        sub: data.sub
                                    }
                                });
                                resolve();
                                Toastr.success('Session removed successfully');
                            } catch (e) {
                                reject(
                                    Toastr.error(
                                        e.networkError.result.errors[0].message
                                    )
                                );
                                history.push('/sign-in');
                                window.location.reload();
                            }
                        });
                    }
                }}
                options={{
                    search: false,
                    headerStyle: {
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }
                }}
                actions={[
                    {
                        icon: 'refresh',
                        tooltip: 'Refresh',
                        isFreeAction: true,
                        onClick: () =>
                            tableRef.current && tableRef.current.onQueryChange()
                    }
                ]}
            />
        </div>
    );
};

export default SessionsPage;
