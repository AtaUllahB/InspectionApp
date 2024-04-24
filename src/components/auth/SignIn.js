import React from 'react';
import styled from '@emotion/styled';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import {
  Alert as MuiAlert,
  Checkbox,
  FormControlLabel,
  Button,
  TextField as MuiTextField,
} from '@mui/material';
import { spacing } from '@mui/system';

import { login } from '../../services/authService'; // Import the login function

const Alert = styled(MuiAlert)(spacing);
const TextField = styled(MuiTextField)(spacing);

function SignIn() {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const response = await login(values.email, values.password);
      
          // Store tokens in localStorage
          localStorage.setItem('accessToken', response.access_token);
          localStorage.setItem('refreshToken', response.refresh_token);
      
          // Assuming the login response includes user details with a role
          // You might need to adjust based on your actual response structure
          const userRole = response.user.role;
          
          // Redirect based on the user role
          switch (userRole) {
            case 'admin':
              router.push('/dashboard/admin');
              break;
            case 'inspector':
              router.push('/pages/scancabinid');
              break;
            // Add more cases as per your application's roles
            default:
              router.push('/'); // Redirect to home page or a default route
              break;
          }
        } catch (error) {
          const message = error.response?.data?.message || 'Something went wrong';
      
          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          {errors.submit && (
            <Alert mt={2} mb={3} severity="warning">
              {errors.submit}
            </Alert>
          )}
          <TextField
            type="email"
            name="email"
            label="Email Address"
            value={values.email}
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            value={values.password}
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Sign in
          </Button>
          <button onClick={() => router.push('/auth/reset-password')} style={{ color: 'blue', background: 'none', border: 'none', padding: '10px', cursor: 'pointer', textAlign: 'center', display: 'block', marginTop: '10px' }}>
            Forgot password?
          </button>
        </form>
      )}
    </Formik>
  );
}

export default SignIn;
