import React, { useState, useEffect, createRef } from 'react';
import MaterialTable from 'material-table';
import Toastr from 'toastr';
import { makeStyles } from '@material-ui/styles';
import { useQuery } from '@apollo/client';

import { ADMIN_LIST } from '../quries/ADMIN';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    }
}));

const AdminsPage = () => {
    const tableRef = createRef();

    useEffect(() => {
        document.title = 'Tech Diary | Admins';
    }, []);

    const { fetchMore } = useQuery(ADMIN_LIST, {
        errorPolicy: 'all'
    });

    const classes = useStyles();

    const [state] = useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Username', field: 'username' },
            { title: 'Email', field: 'email' }
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
                title="Admins"
                columns={state.columns}
                tableRef={tableRef}
                options={{
                    search: false
                }}
                data={(query) =>
                    new Promise(async (resolve) => {
                        const data = await fetchMore({
                            variables: {
                                page: query.page + 1,
                                limit: query.pageSize
                            }
                        });
                        resolve({
                            data: data?.data.admins?.data,
                            page: data?.data.admins.currentPage - 1,
                            totalCount: data?.data.admins?.resourceCount
                        });
                    })
                }
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

export default AdminsPage;
