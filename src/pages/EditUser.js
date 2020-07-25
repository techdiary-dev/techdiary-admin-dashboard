import React, { useEffect } from 'react';
import Toastr from 'toastr';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@apollo/client';
import {
    Card,
    Grid,
    Button,
    CardContent,
    TextField,
    makeStyles,
    Typography
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

const EditUserPage = ({ match }) => {
    const classes = useStyles();

    useEffect(() => {
        document.title = 'Tech Diary | Edit User';
    }, []);

    const { register, handleSubmit, reset } = useForm();

    const { data, loading } = useQuery(GET_ARTICLE, {
        variables: { _id: match.params._id },
        fetchPolicy: 'network-only'
    });

    useEffect(() => {
        const article = {
            ...data?.article,
            tags: data?.article.tags.map((item, i) => ({
                value: i,
                label: item
            }))
        };
        reset(article);
    }, [data, loading, reset]);

    useEffect(() => {
        register('body');
    }, [register]);

    const [updateArticle] = useMutation(UPDATE_ARTICLE);

    Toastr.options = {
        closeButton: true,
        newestOnTop: true,
        progressBar: true
    };

    const onSubmit = async ({
        title,
        body,
        tags,
        isPublished,
        thumbnail,
        seriesName
    }) => {
        try {
            const newData = await updateArticle({
                variables: {
                    _id: match.params._id,
                    title,
                    body,
                    tags,
                    isPublished,
                    thumbnail,
                    seriesName
                }
            });
            Toastr.success('Successfully update the user');
            console.log(newData);
        } catch (e) {
            Toastr.error(e.networkError.result.errors[0].message);
        }
    };

    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Card className={`${classes.overflow}`}>
                            <CardContent>
                                <Typography>Name</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Name"
                                    name="name"
                                    margin="normal"
                                    fullWidth
                                    inputRef={register}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Card
                            className={`${classes.overflow} ${classes.spacingBottom}`}>
                            <CardContent>
                                <Typography>Email</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Email"
                                    name="email"
                                    margin="normal"
                                    fullWidth
                                    inputRef={register}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Card
                            className={`${classes.overflow} ${classes.spacingBottom}`}>
                            <CardContent>
                                <Typography>Username</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Username"
                                    name="username"
                                    margin="normal"
                                    fullWidth
                                    inputRef={register}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Card
                            className={`${classes.overflow} ${classes.spacingBottom}`}>
                            <CardContent>
                                <Typography>Education</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Education"
                                    name="education"
                                    margin="normal"
                                    fullWidth
                                    inputRef={register}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Card
                            className={`${classes.overflow} ${classes.spacingBottom}`}>
                            <CardContent>
                                <Typography>Designation</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Designation"
                                    name="designation"
                                    margin="normal"
                                    fullWidth
                                    inputRef={register}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Card
                            className={`${classes.overflow} ${classes.spacingBottom}`}>
                            <CardContent>
                                <Typography>Location</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Location"
                                    name="location"
                                    margin="normal"
                                    fullWidth
                                    inputRef={register}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Card
                            className={`${classes.overflow} ${classes.spacingBottom}`}>
                            <CardContent>
                                <Typography>Bio</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Bio"
                                    name="bio"
                                    margin="normal"
                                    fullWidth
                                    inputRef={register}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Card
                            className={`${classes.overflow} ${classes.spacingBottom}`}>
                            <CardContent>
                                <Typography>Links Text</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Links Text"
                                    name="linksText"
                                    margin="normal"
                                    fullWidth
                                    inputRef={register}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Card
                            className={`${classes.overflow} ${classes.spacingBottom}`}>
                            <CardContent>
                                <Typography>Links Link</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Links Link"
                                    name="linksLink"
                                    margin="normal"
                                    fullWidth
                                    inputRef={register}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Card
                            className={`${classes.overflow} ${classes.spacingBottom}`}>
                            <CardContent>
                                <Typography>Work Info Name</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Work Info Name"
                                    name="workInfoName"
                                    margin="normal"
                                    fullWidth
                                    inputRef={register}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Card
                            className={`${classes.overflow} ${classes.spacingBottom}`}>
                            <CardContent>
                                <Typography>Work Info Designation</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Work Info Designation"
                                    name="workInfoDesignation"
                                    margin="normal"
                                    fullWidth
                                    inputRef={register}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Card
                            className={`${classes.overflow} ${classes.spacingBottom}`}>
                            <CardContent>
                                <Typography>Work Info Start Time</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Work Info Start Time"
                                    name="workInfoStartTime"
                                    margin="normal"
                                    fullWidth
                                    inputRef={register}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Card
                            className={`${classes.overflow} ${classes.spacingBottom}`}>
                            <CardContent>
                                <Typography>Work Info End Time</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Work Info End Time"
                                    name="workInfoEndTime"
                                    margin="normal"
                                    fullWidth
                                    inputRef={register}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Card
                            className={`${classes.overflow} ${classes.spacingBottom}`}>
                            <CardContent>
                                <Typography>Skills</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Skills"
                                    name="skills"
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
                        Update User
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditUserPage;
