import React, { useState, useEffect, createRef } from 'react';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import Toastr from 'toastr';
import { makeStyles } from '@material-ui/styles';
import { useQuery } from '@apollo/client';

import { USER_LIST } from '../quries/USER';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    }
}));

const UsersPage = () => {
    const tableRef = createRef();
    const history = useHistory();
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        document.title = 'Tech Diary | Users';
    }, []);

    const { fetchMore } = useQuery(USER_LIST, {
        errorPolicy: 'all'
    });

    const classes = useStyles();

    const [state] = useState({
        columns: [
            {
                title: 'Photo',
                field: 'profilePhoto',
                render: (rowData) => (
                    <span>
                        {rowData.profilePhoto ? (
                            <img
                                src={rowData.profilePhoto}
                                alt="Avatar"
                                style={{ width: 50, borderRadius: '50%' }}
                            />
                        ) : (
                            ''
                        )}
                    </span>
                )
            },
            {
                title: 'Name',
                field: 'name',
                render: (rowData) => (
                    <a
                        href={`https://www.techdiary.dev/${rowData.username}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        {rowData.name}
                    </a>
                )
            },
            { title: 'Username', field: 'username' },
            { title: 'Email', field: 'email' },
            { title: 'Location', field: 'location' }
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
                title="Users"
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
                            data: data?.data.getAllUsers?.data,
                            page: data?.data.getAllUsers.currentPage - 1,
                            totalCount: data?.data.getAllUsers?.resourceCount
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
                        icon: 'edit',
                        tooltip: 'Edit User',
                        onClick: (_, { username, _id }) =>
                            history.push(`/users/edit/${username}/${_id}`)
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

export default UsersPage;
