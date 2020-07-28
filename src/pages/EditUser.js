import React, { useEffect } from 'react';
import Toastr from 'toastr';
import { useForm, useFieldArray } from 'react-hook-form';
import { useQuery, useMutation } from '@apollo/client';

import {
    Card,
    Grid,
    Button,
    CardContent,
    CardActions,
    TextField,
    makeStyles,
    Typography,
    CardHeader,
    Divider
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import { USER_PROFILE, UPDATE_PROFILE } from '../quries/USER';

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
    deleteIcon: {
        display: 'flex',
        alignItems: 'center'
    },
    errorMsg: {
        color: 'red'
    }
}));

const EditUserPage = ({
    match: {
        params: { username, _id }
    }
}) => {
    const classes = useStyles();

    useEffect(() => {
        document.title = 'Tech Diary | Edit User';
    }, []);

    const { register, handleSubmit, reset, control } = useForm();

    const {
        fields: linkFields,
        append: appendLink,
        remove: removeLink
    } = useFieldArray({
        control,
        name: 'links'
    });

    const {
        fields: workInfoFileds,
        append: appendWorkInfo,
        remove: removeWorkInfo
    } = useFieldArray({
        control,
        name: 'workInfo'
    });

    const {
        fields: skillFields,
        append: appendSkill,
        remove: removeSkill
    } = useFieldArray({
        control,
        name: 'skills'
    });

    const { data, loading } = useQuery(USER_PROFILE, {
        variables: { username },
        fetchPolicy: 'network-only'
    });

    useEffect(() => {
        const profile = {
            ...data?.profile
        };
        reset(profile);
    }, [data, loading, reset]);

    const [updateUserProfile] = useMutation(UPDATE_PROFILE);

    Toastr.options = {
        closeButton: true,
        newestOnTop: true,
        progressBar: true
    };

    const onSubmit = async ({
        name,
        username,
        email,
        education,
        designation,
        location,
        bio,
        links,
        skills,
        workInfo
    }) => {
        if (!skills) skills = [];
        if (!links) links = [];
        if (!workInfo) workInfo = [];
        try {
            await updateUserProfile({
                variables: {
                    _id,
                    name,
                    username,
                    email,
                    education,
                    designation,
                    location,
                    bio,
                    links,
                    skills,
                    workInfo
                }
            });
            Toastr.success('Successfully update user profile');
        } catch (e) {
            Toastr.error(e.networkError.result.errors[0].message);
        }
    };

    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3} className={classes.spacingBottom}>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Card className={`${classes.overflow}`}>
                            <CardContent>
                                <Typography>Name</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Name"
                                    name="name"
                                    margin="dense"
                                    fullWidth
                                    inputRef={register}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Card className={`${classes.overflow}`}>
                            <CardContent>
                                <Typography>Username</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Username"
                                    name="username"
                                    margin="dense"
                                    fullWidth
                                    inputRef={register}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Card className={`${classes.overflow}`}>
                            <CardContent>
                                <Typography>Email</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Email"
                                    name="email"
                                    margin="dense"
                                    fullWidth
                                    inputRef={register}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Card className={`${classes.overflow}`}>
                            <CardContent>
                                <Typography>Location</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Location"
                                    name="location"
                                    margin="dense"
                                    fullWidth
                                    inputRef={register}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Card className={`${classes.overflow}`}>
                            <CardContent>
                                <Typography>Education</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Education"
                                    name="education"
                                    margin="dense"
                                    fullWidth
                                    inputRef={register}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Card className={`${classes.overflow}`}>
                            <CardContent>
                                <Typography>Designation</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Designation"
                                    name="designation"
                                    margin="dense"
                                    fullWidth
                                    inputRef={register}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Card className={`${classes.overflow}`}>
                            <CardContent>
                                <Typography>Bio</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Bio"
                                    name="bio"
                                    margin="dense"
                                    fullWidth
                                    inputRef={register}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Card className={`${classes.overflow}`}>
                            <CardHeader title="Website" />
                            <Divider />
                            <Grid>
                                {linkFields.map((item, index) => {
                                    return (
                                        <div key={item.id}>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}>
                                                <CardContent>
                                                    <Typography>
                                                        Text
                                                    </Typography>
                                                    <TextField
                                                        variant="outlined"
                                                        name={`links[${index}].text`}
                                                        placeholder="Text"
                                                        margin="dense"
                                                        fullWidth
                                                        defaultValue={item.text} // make sure to set up defaultValue
                                                        inputRef={register()}
                                                    />
                                                </CardContent>
                                            </Grid>

                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}>
                                                <CardContent>
                                                    <Typography>
                                                        Link
                                                    </Typography>

                                                    <TextField
                                                        variant="outlined"
                                                        name={`links[${index}].link`}
                                                        placeholder="Link"
                                                        margin="dense"
                                                        fullWidth
                                                        defaultValue={item.link} // make sure to set up defaultValue
                                                        inputRef={register()}
                                                    />
                                                    <div
                                                        onClick={() =>
                                                            removeLink(index)
                                                        }>
                                                        <span
                                                            style={{
                                                                cursor:
                                                                    'pointer'
                                                            }}>
                                                            <DeleteIcon />
                                                        </span>
                                                    </div>
                                                </CardContent>
                                            </Grid>
                                        </div>
                                    );
                                })}
                                <CardActions>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={() =>
                                            appendLink({
                                                text: '',
                                                link: ''
                                            })
                                        }>
                                        ADD
                                    </Button>
                                </CardActions>
                            </Grid>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={4}>
                        <Card className={`${classes.overflow}`}>
                            <CardHeader title="Workspace Information" />
                            <Divider />
                            <Grid>
                                {workInfoFileds.map((item, index) => {
                                    return (
                                        <div key={item.id}>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}>
                                                <CardContent>
                                                    <Typography>
                                                        Name
                                                    </Typography>
                                                    <TextField
                                                        variant="outlined"
                                                        name={`workInfo[${index}].name`}
                                                        placeholder="Name"
                                                        margin="dense"
                                                        fullWidth
                                                        defaultValue={item.name} // make sure to set up defaultValue
                                                        inputRef={register()}
                                                    />
                                                </CardContent>
                                            </Grid>

                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}>
                                                <CardContent>
                                                    <Typography>
                                                        Designation
                                                    </Typography>
                                                    <TextField
                                                        variant="outlined"
                                                        name={`workInfo[${index}].designation`}
                                                        placeholder="Designation"
                                                        margin="dense"
                                                        fullWidth
                                                        defaultValue={
                                                            item.designation
                                                        } // make sure to set up defaultValue
                                                        inputRef={register()}
                                                    />
                                                </CardContent>
                                            </Grid>

                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}>
                                                <CardContent>
                                                    <Typography>
                                                        Start Time
                                                    </Typography>
                                                    <TextField
                                                        variant="outlined"
                                                        margin="dense"
                                                        type="date"
                                                        defaultValue={
                                                            item.startTime
                                                        }
                                                        name={`workInfo[${index}].startTime`}
                                                        inputRef={register()}
                                                    />
                                                </CardContent>
                                            </Grid>

                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}>
                                                <CardContent>
                                                    <Typography>
                                                        End Time
                                                    </Typography>

                                                    <TextField
                                                        variant="outlined"
                                                        margin="dense"
                                                        type="date"
                                                        defaultValue={
                                                            item.endTime
                                                        }
                                                        name={`workInfo[${index}].endTime`}
                                                        inputRef={register()}
                                                    />
                                                    <div
                                                        onClick={() =>
                                                            removeWorkInfo(
                                                                index
                                                            )
                                                        }>
                                                        <span
                                                            style={{
                                                                cursor:
                                                                    'pointer'
                                                            }}>
                                                            <DeleteIcon />
                                                        </span>
                                                    </div>
                                                </CardContent>
                                            </Grid>
                                        </div>
                                    );
                                })}
                                <CardActions>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={() =>
                                            appendWorkInfo({
                                                text: '',
                                                designation: '',
                                                startTime: '',
                                                endTime: ''
                                            })
                                        }>
                                        ADD
                                    </Button>
                                </CardActions>
                            </Grid>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <Card className={`${classes.overflow}`}>
                            <CardHeader title="Skills" />
                            <Divider />
                            <Grid>
                                {skillFields.map((item, index) => {
                                    return (
                                        <div key={item.id}>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}>
                                                <CardContent>
                                                    <div
                                                        className={
                                                            classes.deleteIcon
                                                        }>
                                                        <TextField
                                                            variant="outlined"
                                                            name={`skills[${index}]`}
                                                            placeholder="Skills"
                                                            margin="dense"
                                                            fullWidth
                                                            defaultValue={
                                                                item.value
                                                            } // make sure to set up defaultValue
                                                            inputRef={register()}
                                                        />
                                                        <div
                                                            onClick={() =>
                                                                removeSkill(
                                                                    index
                                                                )
                                                            }>
                                                            <span
                                                                style={{
                                                                    cursor:
                                                                        'pointer'
                                                                }}>
                                                                <DeleteIcon />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Grid>
                                        </div>
                                    );
                                })}
                                <CardActions>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={() =>
                                            appendSkill({ value: '' })
                                        }>
                                        ADD
                                    </Button>
                                </CardActions>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>

                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.spacingTop}>
                    Update User
                </Button>
            </form>
        </div>
    );
};

export default EditUserPage;
