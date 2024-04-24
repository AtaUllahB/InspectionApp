import React from 'react';
import styled from '@emotion/styled';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import {
  Alert as MuiAlert,
  Button,
  TextField as MuiTextField,
} from '@mui/material';
import { spacing } from '@mui/system';
import { createUser } from '../../services/userService';

const Alert = styled(MuiAlert)(spacing);
const TextField = styled(MuiTextField)(spacing);

function SignUp() {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        pin: '', // Updated from 'pin' to 'password'
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('Name is required')
          .min(3, 'Name must be at least 3 characters')
          .max(60, 'Name must be at most 60 characters'),
        email: Yup.string()
          .email('Must be a valid email')
          .required('Email is required'),
        pin: Yup.string() // Change to 'pin' for the 4-digit PIN
          .required('PIN is required')
          .matches(/^[0-9]{4}$/, 'PIN must be a 4-digit number'), // Add regex validation for 4 digits
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await createUser({
            name: values.name,
            email: values.email,
            password: values.pin,
            role: 'inspector', // Assuming role is fixed for SignUp
          });
          router.push('/auth/select-account');
        } catch (error) {
          const message = error.message || 'Something went wrong';
          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          {errors.submit && <Alert mt={2} mb={1} severity="warning">{errors.submit}</Alert>}
          <TextField
            type="text"
            name="name"
            label="Name"
            value={values.name}
            error={Boolean(touched.name && errors.name)}
            fullWidth
            helperText={touched.name && errors.name}
            onBlur={handleBlur}
            onChange={handleChange}
            my={3}
          />
          <TextField
            type="email"
            name="email"
            label="Email address"
            value={values.email}
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
            my={3}
          />
       <TextField
  type="text" // Change to 'text' for PIN input
  name="pin" // Change to 'pin' for the 4-digit PIN
  label="4-Digit PIN" // Update label to reflect the change
  value={values.pin} // Change to 'pin' for the 4-digit PIN
  error={Boolean(touched.pin && errors.pin)} // Change to 'pin' for the 4-digit PIN
  fullWidth
  helperText={touched.pin && errors.pin} // Change to 'pin' for the 4-digit PIN
  onBlur={handleBlur}
  onChange={handleChange}
  my={3}
/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Sign up
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default SignUp;
