import React, { useState, useEffect, createRef } from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/styles';
import { useQuery, useMutation } from '@apollo/client';
import { Switch } from '@material-ui/core';
import Toastr from 'toastr';

import { FEATURED_ARTICLE_LIST, UPDATE_ARTICLE } from '../quries/ARTICLE';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    }
}));

const FeaturedArticlesPage = () => {
    const tableRef = createRef();

    useEffect(() => {
        document.title = 'Tech Diary | Featured Articles';
    }, []);

    const { fetchMore } = useQuery(FEATURED_ARTICLE_LIST, {
        errorPolicy: 'all'
    });

    const [updateArticle] = useMutation(UPDATE_ARTICLE, {
        refetchQueries: [
            {
                query: FEATURED_ARTICLE_LIST
            }
        ]
    });

    const classes = useStyles();

    const [state] = useState({
        columns: [
            {
                title: 'Title',
                field: 'title',
                render: (rowData) => (
                    <a
                        href={`https://www.techdiary.dev/${rowData.url}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        {rowData.title}
                    </a>
                )
            },
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
                field: 'author.name'
            },
            {
                title: 'Status',
                field: 'isFeatured',
                render: (rowData) => (
                    <Switch
                        checked={rowData.isFeatured}
                        onChange={() => changeHandler(rowData)}
                    />
                )
            }
        ]
    });

    const changeHandler = async (rowData) => {
        rowData.isFeatured = !rowData.isFeatured;
        updateArticle({
            variables: { ...rowData }
        });
        Toastr.success(`Featured status updated successfully`);
    };

    return (
        <div className={classes.root}>
            <MaterialTable
                title="Featured Articles"
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
                            data: data?.data.featuredArticles?.data,
                            page: data?.data.featuredArticles.currentPage - 1,
                            totalCount:
                                data?.data.featuredArticles?.resourceCount
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

export default FeaturedArticlesPage;
