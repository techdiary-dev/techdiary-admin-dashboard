import * as yup from 'yup';

export const profileSchema = yup.object().shape({
    name: yup.string().trim().required('Name is required'),
    username: yup.string().trim().required('Username is required'),
    email: yup.string().trim().required().email('Email must be a valid email')
});

export const passwordSchema = yup.object().shape({
    currentPassword: yup.string().required('Required'),
    newPassword: yup.string().required('Required'),
    confirmNewPassword: yup.string().required('Required')
});

export const signInSchema = yup.object().shape({
    identifier: yup.string().trim().required('Identifier is required'),
    password: yup.string().required('Password is required')
});

export const signUpSchema = yup.object().shape({
    name: yup.string().trim().required('Name is required'),
    username: yup.string().trim().required('Username is required'),
    email: yup
        .string()
        .email('Email must be a valid email')
        .trim()
        .required('Email is required'),
    password: yup.string().required('Password is required')
});

export const createAdminSchema = yup.object().shape({
    name: yup.string().trim().required('Name is required'),
    username: yup.string().trim().required('Username is required'),
    email: yup
        .string()
        .email('Email must be a valid email')
        .trim()
        .required('Email is required'),
    password: yup.string().required('Password is required')
});
