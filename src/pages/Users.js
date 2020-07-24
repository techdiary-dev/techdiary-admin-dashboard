import React, { useState, useEffect } from 'react';
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
                        target="_blank">
                        {rowData.name}
                    </a>
                )
            },
            { title: 'Email', field: 'email' },
            { title: 'Username', field: 'username' },
            { title: 'GitHub UID', field: 'githubUID' },
            { title: 'Education', field: 'education' },
            { title: 'Designation', field: 'designation' },
            { title: 'Location', field: 'location' },
            { title: 'Bio', field: 'bio' },
            { title: 'Links Text', field: 'links.text' },
            { title: 'Links Link', field: 'links.link' },
            { title: 'Work Info Name', field: 'workInfo.name' },
            { title: 'Work Info Designation', field: 'workInfo.designation' },
            { title: 'Work Info Start Time', field: 'workInfo.startTime' },
            { title: 'Work Info End Time', field: 'workInfo.endTime' },
            { title: 'Skills', field: 'skills' }
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
                        onClick: (_, { _id }) =>
                            history.push('/users/edit/' + _id)
                    }
                ]}
            />
        </div>
    );
};

export default UsersPage;
