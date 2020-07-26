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
                    <img
                        src={rowData.profilePhoto}
                        alt="Profile Avatar"
                        style={{ width: 50, borderRadius: '50%' }}
                    />
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
            { title: 'Education', field: 'education' },
            { title: 'Designation', field: 'designation' },
            { title: 'Location', field: 'location' },
            { title: 'Bio', field: 'bio' },
            { title: 'Skills', field: 'skills' },
            { title: 'GitHub UID', field: 'githubUID' }
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
                // editable={{
                //     onRowDelete: (data) => {
                //         return new Promise(async (resolve, reject) => {
                //             await deleteArticle({
                //                 variables: { _id: data._id }
                //             });
                //             console.log(error?.message);
                //             if (error?.message.length) {
                //                 console.log(error?.message);
                //                 return reject();
                //             } else {
                //                 resolve();
                //                 Toastr.success(
                //                     'You have deleted article successfully'
                //                 );
                //             }
                //         });
                //     }
                // }}
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
