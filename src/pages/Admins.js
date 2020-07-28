import React, { useState, useEffect, createRef } from 'react';
import { useHistory } from 'react-router-dom';
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

const CreateAdminPage = () => {
    const history = useHistory();
    const tableRef = createRef();
    const [selectedRow, setSelectedRow] = useState(null);

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
                onRowClick={(evt, selectedRow) =>
                    setSelectedRow(selectedRow.tableData.id)
                }
                options={{
                    headerStyle: {
                        fontSize: '17px',
                        fontWeight: 'bold'
                    },
                    rowStyle: (rowData) => ({
                        backgroundColor:
                            selectedRow === rowData.tableData.id
                                ? '#EEE'
                                : '#FFF'
                    })
                }}
                actions={[
                    {
                        icon: 'add',
                        tooltip: 'Create Admin',
                        isFreeAction: true,
                        onClick: () => history.push('/create-admin')
                    },
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

export default CreateAdminPage;
