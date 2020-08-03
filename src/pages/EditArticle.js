import React, { useState, useEffect } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Toastr from 'toastr';
import CreatableSelect from 'react-select/creatable';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    progress: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
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
    const classes = useStyles();

    useEffect(() => {
        document.title = 'Tech Diary | Edit Article';
    }, []);

    const { register, handleSubmit, setValue, reset } = useForm();

    const { data, loading } = useQuery(GET_ARTICLE, {
        variables: { _id: match.params._id },
        fetchPolicy: 'network-only'
    });

    const [articleBody, setArticleBody] = useState('');
    const [articleTags, setArticleTags] = useState([]);

    useEffect(() => {
        const article = {
            ...data?.article,
            tags: data?.article.tags.map((item) => ({
                value: item,
                label: item
            }))
        };
        reset(article);
        const formatedTags = data?.article.tags.map((item) => ({
            value: item,
            label: item
        }));
        setArticleBody(data?.article.body);
        setArticleTags(formatedTags);
    }, [data, loading, reset]);

    const [updateArticle] = useMutation(UPDATE_ARTICLE);

    Toastr.options = {
        closeButton: true,
        newestOnTop: true,
        progressBar: true
    };

    const mdParser = new MarkdownIt();

    const handleEditorChange = ({ text }) => {
        setArticleBody(text);
    };

    const onSubmit = async ({
        title,
        tags,
        isPublished,
        isFeatured,
        isPinned,
        thumbnail,
        seriesName
    }) => {
        const updatedFormatTags = tags.map((item) => item.value);
        try {
            await updateArticle({
                variables: {
                    _id: match.params._id,
                    title,
                    body: articleBody,
                    tags: updatedFormatTags,
                    isPublished,
                    isFeatured,
                    isPinned,
                    thumbnail,
                    seriesName
                }
            });
            Toastr.success('Successfully update the article');
        } catch (e) {
            Toastr.error(e.networkError.result.errors[0].message);
        }
    };

    if (loading)
        return (
            <div className={`${classes.progress}`}>
                <CircularProgress color="secondary" size={35} />
            </div>
        );

    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Card className={`${classes.overflow}`}>
                            <CardContent>
                                <Typography>Article Title</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Title"
                                    name="title"
                                    margin="normal"
                                    fullWidth
                                    inputRef={register}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={12}>
                        <Card className={`${classes.overflow}`}>
                            <CardContent>
                                <Typography
                                    className={`${classes.spacingBottom}`}>
                                    Article Body
                                </Typography>
                                <MdEditor
                                    value={articleBody}
                                    style={{ height: '600px' }}
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
                                <Typography>Tags</Typography>
                                <RHFInput
                                    as={
                                        <CreatableSelect
                                            options={articleTags}
                                        />
                                    }
                                    isMulti
                                    name="tags"
                                    register={register}
                                    setValue={setValue}
                                />
                            </CardContent>
                        </Card>

                        <Card
                            className={`${classes.overflow} ${classes.spacingBottom}`}>
                            <CardContent>
                                <Typography
                                    className={`${classes.spacingBottom}`}>
                                    Published Status
                                </Typography>
                                <RHFInput
                                    type="checkbox"
                                    register={register}
                                    setValue={setValue}
                                    name="isPublished"
                                    as={<Switch />}
                                />
                            </CardContent>
                        </Card>
                        <Card
                            className={`${classes.overflow} ${classes.spacingBottom}`}>
                            <CardContent>
                                <Typography
                                    className={`${classes.spacingBottom}`}>
                                    Featured Status
                                </Typography>
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
                                <Typography
                                    className={`${classes.spacingBottom}`}>
                                    Pinned Status
                                </Typography>
                                <RHFInput
                                    type="checkbox"
                                    register={register}
                                    setValue={setValue}
                                    name="isPinned"
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
