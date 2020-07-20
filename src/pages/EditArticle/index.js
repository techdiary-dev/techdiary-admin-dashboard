import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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

import { GET_ARTICLE, UPDATE_ARTICLE } from '../../quries/ARTICLE';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3)
    },
    editor: {
        height: 150,
        marginTop: 10,
        marginBottom: 45
    },
    editorError: {
        '& > .ql-toolbar.ql-snow , & > .ql-container.ql-snow': {
            borderColor: 'red'
        }
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

const EditArticle = ({ match }) => {
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

    const onSubmit = (data) => {
        updateArticle({
            variables: { _id: match.params._id, body: data.body }
        });
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
                                <ReactQuill
                                    className={classes.editor}
                                    ref={register({ name: 'body' })}
                                    value={
                                        getValues('body') || data?.article.body
                                    }
                                    onChange={(value) =>
                                        setValue('body', value)
                                    }
                                />
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

export default EditArticle;
