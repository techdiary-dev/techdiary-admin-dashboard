import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/styles';
import { useQuery } from '@apollo/client';

import { FEATURED_ARTICLE_LIST } from '../quries/ARTICLE';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    }
}));

const FeaturedArticlesPage = () => {
    useEffect(() => {
        document.title = 'Tech Diary | Featured Articles';
    }, []);

    const { fetchMore } = useQuery(FEATURED_ARTICLE_LIST, {
        errorPolicy: 'all'
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
            }
        ]
    });

    return (
        <div className={classes.root}>
            <MaterialTable
                title="Featured Articles"
                columns={state.columns}
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
            />
        </div>
    );
};

export default FeaturedArticlesPage;
