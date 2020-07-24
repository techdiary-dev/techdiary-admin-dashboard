import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import Toastr from 'toastr';
import { makeStyles } from '@material-ui/styles';
import { useQuery, useMutation } from '@apollo/client';

import { ARTICLE_LIST, DELETE_ARTICLE } from '../quries/ARTICLE';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    }
}));

const ArticlesPage = () => {
    const history = useHistory();

    useEffect(() => {
        document.title = 'Tech Diary | Articles';
    }, []);

    const { fetchMore } = useQuery(ARTICLE_LIST, {
        errorPolicy: 'all'
    });
    const [deleteArticle, { error }] = useMutation(DELETE_ARTICLE, {
        errorPolicy: 'all',
        fetchPolicy: 'no-cache'
    });

    const classes = useStyles();

    const [state] = useState({
        columns: [
            { title: 'Title', field: 'title' },
            {
                title: 'Thumbnail',
                field: 'thumbnail',
                render: (rowData) => (
                    <img
                        src={rowData.thumbnail}
                        alt="Thumbnail"
                        style={{ width: '50%', height: 'auto' }}
                    />
                )
            },
            { title: 'Tags', field: 'tags' },
            {
                title: 'Author',
                field: 'author.name',
                render: (rowData) => (
                    <a
                        href={`https://www.techdiary.dev/${rowData.author.username}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        {rowData.author.name}
                    </a>
                )
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
                title="Articles"
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
                            data: data?.data.articles?.data,
                            page: data?.data.articles.currentPage - 1,
                            totalCount: data?.data.articles?.resourceCount
                        });
                    })
                }
                editable={{
                    onRowDelete: (data) => {
                        return new Promise(async (resolve, reject) => {
                            await deleteArticle({
                                variables: { _id: data._id }
                            });

                            if (error?.message.length) {
                                Toastr.error(error?.message);
                            } else {
                                Toastr.success(
                                    'You have deleted article successfully'
                                );
                                resolve();
                            }
                        });
                    }
                }}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Article',
                        onClick: (_, { _id }) =>
                            history.push('/articles/edit/' + _id)
                    }
                ]}
            />
        </div>
    );
};

export default ArticlesPage;
