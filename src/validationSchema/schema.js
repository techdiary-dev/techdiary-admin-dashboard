import * as yup from 'yup';

export const profileSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    username: yup.string().required('Username is required'),
    email: yup.string().required().email('Email must be a valid email')
});

export const passwordSchema = yup.object().shape({
    currentPassword: yup.string().required('Required'),
    newPassword: yup.string().required('Required'),
    confirmNewPassword: yup.string().required('Required')
});

export const signInSchema = yup.object().shape({
    identifier: yup.string().required('Identifier is required'),
    password: yup.string().required('Password is required')
});
