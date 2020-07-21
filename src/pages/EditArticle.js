import React, { useState, useEffect } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Toastr from 'toastr';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@apollo/client';
import {
    Card,
    Grid,
    Button,
    CardContent,
    makeStyles,
    Typography
} from '@material-ui/core';

import { GET_ARTICLE, UPDATE_ARTICLE } from '../quries/ARTICLE';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3)
    },
    overflow: {
        overflow: 'visible'
    },
    chooseGroup: {
        margin: '15px 0'
    },
    spacingBottom: {
        marginBottom: 15
    },
    spacingTop: {
        marginTop: 15
    },
    spacingRight: {
        marginRight: 15
    },
    errorMsg: {
        color: 'red'
    }
}));

const EditArticlePage = ({ match }) => {
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        document.title = 'Tech Diary | Edit Article';
    }, []);

    const { register, handleSubmit, setValue, getValues } = useForm();

    const { data } = useQuery(GET_ARTICLE, {
        variables: { _id: match.params._id },
        fetchPolicy: 'network-only'
    });

    const [updateArticle] = useMutation(UPDATE_ARTICLE);

    Toastr.options = {
        closeButton: true,
        newestOnTop: true,
        progressBar: true
    };

    const onSubmit = async (data) => {
        try {
            await updateArticle({
                variables: { _id: match.params._id, body: data.body }
            });
            Toastr.success('Update Successfull');
            history.push('/articles');
        } catch (e) {
            Toastr.error(e.message);
        }
    };

    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item md={12}>
                        <Card
                            className={`${classes.overflow} ${classes.spacingBottom}`}>
                            <CardContent>
                                <Typography
                                    className={classes.cardBody}
                                    color="textSecondary">
                                    Body
                                </Typography>
                            </CardContent>
                        </Card>

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.spacingRight}>
                            Update Article
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default EditArticlePage;
