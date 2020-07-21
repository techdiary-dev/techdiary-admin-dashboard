import React, { useState, useEffect } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Toastr from 'toastr';
import { useHistory } from 'react-router-dom';
import { RHFInput } from 'react-hook-form-input';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@apollo/client';
import {
    Card,
    Grid,
    Button,
    CardContent,
    TextField,
    makeStyles,
    Typography,
    Switch
} from '@material-ui/core';

import { GET_ARTICLE, UPDATE_ARTICLE } from '../quries/ARTICLE';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4)
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

    const {
        register,
        handleSubmit,
        errors,
        getValues,
        setValue,
        control,
        reset,
        watch
    } = useForm();

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

    const mdParser = new MarkdownIt();

    function handleEditorChange({ html, text }) {
        console.log('handleEditorChange', html, text);
    }

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
                    <Grid item sm={12}>
                        <Card className={`${classes.overflow}`}>
                            <CardContent>
                                <Typography
                                    className={`${classes.spacingBottom}`}>
                                    Article Body
                                </Typography>
                                <MdEditor
                                    value=""
                                    style={{ height: '500px' }}
                                    renderHTML={(text) => mdParser.render(text)}
                                    onChange={handleEditorChange}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Card
                            className={`${classes.overflow} ${classes.spacingBottom}`}>
                            <CardContent>
                                <Typography>Article Title</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Title"
                                    label="Title"
                                    name="title"
                                    margin="normal"
                                    fullWidth
                                    inputRef={register}
                                />
                            </CardContent>
                        </Card>
                        <Card
                            className={`${classes.overflow} ${classes.spacingBottom}`}>
                            <CardContent>
                                <Typography>Choose Tags</Typography>
                            </CardContent>
                        </Card>
                        <Card
                            className={`${classes.overflow} ${classes.spacingBottom}`}>
                            <CardContent>
                                <Typography>Published Status</Typography>
                                <RHFInput
                                    type="checkbox"
                                    register={register}
                                    setValue={setValue}
                                    name="isFeatured"
                                    as={<Switch />}
                                />
                            </CardContent>
                        </Card>
                        <Card
                            className={`${classes.overflow} ${classes.spacingBottom}`}>
                            <CardContent>
                                <Typography>Series Name</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Series Name"
                                    label="Series Name"
                                    name="seriesName"
                                    margin="normal"
                                    fullWidth
                                    inputRef={register}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <div className={classes.spacingBottom}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.spacingRight}>
                        Update Article
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditArticlePage;

// <Select
//     onChange={(data) => setValue('tags', data)}
//     query={{
//         fetch: TAG_LIST,
//         create: CREATE_TAG
//     }}
//     mutationKey="createTag"
//     fetchKey="tags"
//     options={watch('tags')}
// />;

// <Card>
//     <CardContent>
//         <Typography
//             className={`${classes.cardTitle}`}
//             color="textSecondary"
//             gutterBottom>
//             Choose thumbnail
//         </Typography>

//         <Thumbnail setValue={setValue} value={watch('thumbnail')} />
//     </CardContent>
// </Card>;
