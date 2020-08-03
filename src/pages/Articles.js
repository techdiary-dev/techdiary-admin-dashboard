import React, { useState, useEffect, createRef } from 'react';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import Toastr from 'toastr';
import { makeStyles } from '@material-ui/styles';
import { useQuery, useMutation } from '@apollo/client';
import { Switch } from '@material-ui/core';

import {
    ARTICLE_LIST,
    DELETE_ARTICLE,
    UPDATE_ARTICLE
} from '../quries/ARTICLE';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    }
}));

const ArticlesPage = () => {
    const tableRef = createRef();
    const history = useHistory();

    useEffect(() => {
        document.title = 'Tech Diary | Articles';
    }, []);

    const { fetchMore } = useQuery(ARTICLE_LIST, {
        fetchPolicy: 'cache-only',
        errorPolicy: 'all'
    });
    const [deleteArticle] = useMutation(DELETE_ARTICLE);
    const [updateArticle] = useMutation(UPDATE_ARTICLE, {
        refetchQueries: [
            {
                query: ARTICLE_LIST
            }
        ]
    });

    const classes = useStyles();

    const [state] = useState({
        columns: [
            { title: 'Title', field: 'title' },
            {
                title: 'Thumbnail',
                field: 'thumbnail',
                render: (rowData) => (
                    <span>
                        {rowData.thumbnail ? (
                            <img
                                src={rowData.thumbnail}
                                alt="Thumbnail"
                                style={{ width: '50%', height: 'auto' }}
                            />
                        ) : (
                            ''
                        )}
                    </span>
                )
            },
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
            },
            {
                title: 'Published Status',
                field: 'isPublished',
                render: (rowData) => (
                    <Switch
                        checked={rowData.isPublished}
                        onChange={() => changeHandler(rowData, 'isPublished')}
                    />
                )
            },
            {
                title: 'Featured Status',
                field: 'isFeatured',
                render: (rowData) => (
                    <Switch
                        checked={rowData.isFeatured}
                        onChange={() => changeHandler(rowData, 'isFeatured')}
                    />
                )
            },
            {
                title: 'Pinned Status',
                field: 'isPinned',
                render: (rowData) => (
                    <Switch
                        checked={rowData.isPinned}
                        onChange={() => changeHandler(rowData, 'isPinned')}
                    />
                )
            }
        ]
    });

    const changeHandler = (rowData, key) => {
        rowData[key] = !rowData[key];
        updateArticle({
            variables: { ...rowData }
        });
        if (key === 'isPublished')
            return Toastr.success(`Published status updated successfully`);
        if (key === 'isFeatured')
            return Toastr.success(`Featured status updated successfully`);
        if (key === 'isPinned')
            return Toastr.success(`Pinned status updated successfully`);
    };

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
                            data: data?.data.articles?.data,
                            page: data?.data.articles.currentPage - 1,
                            totalCount: data?.data.articles?.resourceCount
                        });
                    })
                }
                editable={{
                    onRowDelete: (data) => {
                        return new Promise(async (resolve, reject) => {
                            try {
                                await deleteArticle({
                                    variables: { _id: data._id }
                                });
                                resolve();
                                Toastr.success('Article deleted successfully');
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
                        icon: 'edit',
                        tooltip: 'Edit Article',
                        onClick: (_, { _id }) =>
                            history.push('/articles/edit/' + _id)
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

export default ArticlesPage;
