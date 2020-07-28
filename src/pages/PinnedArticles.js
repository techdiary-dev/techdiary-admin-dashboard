import React, { useState, useEffect, createRef } from 'react';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/styles';
import { useQuery, useMutation } from '@apollo/client';
import { Switch } from '@material-ui/core';
import Toastr from 'toastr';

import { PINNED_ARTICLE_LIST, UPDATE_ARTICLE } from '../quries/ARTICLE';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    }
}));

const PinnedArticlesPage = () => {
    const history = useHistory();
    const tableRef = createRef();
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        document.title = 'Tech Diary | Pinned Articles';
    }, []);

    const { fetchMore } = useQuery(PINNED_ARTICLE_LIST, {
        errorPolicy: 'all'
    });

    const [updateArticle] = useMutation(UPDATE_ARTICLE, {
        refetchQueries: [
            {
                query: PINNED_ARTICLE_LIST
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
                field: 'isPinned',
                render: (rowData) => (
                    <Switch
                        checked={rowData.isPinned}
                        onChange={() => changeHandler(rowData)}
                    />
                )
            }
        ]
    });

    const changeHandler = async (rowData) => {
        rowData.isPinned = !rowData.isPinned;
        updateArticle({
            variables: { ...rowData }
        });
        Toastr.success(`Pinned status updated successfully`);
    };

    return (
        <div className={classes.root}>
            <MaterialTable
                title="Pinned Articles"
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
                            data: data?.data.pinnedArticles?.data,
                            page: data?.data.pinnedArticles.currentPage - 1,
                            totalCount: data?.data.pinnedArticles?.resourceCount
                        });
                    })
                }
                onRowClick={(evt, selectedRow) =>
                    setSelectedRow(selectedRow.tableData.id)
                }
                options={{
                    search: false,
                    headerStyle: {
                        fontSize: '16px',
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
                        tooltip: 'Edit Pinned Article',
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

export default PinnedArticlesPage;
