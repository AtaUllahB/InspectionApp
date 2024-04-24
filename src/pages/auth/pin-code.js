import styled from '@emotion/styled'
import { Helmet } from 'react-helmet-async'
import { Box, Typography,  Grid} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import React, { useState } from 'react'
import { useRouter } from 'next/router' // Import useRouter from next/router for routing in Next.js
import * as Yup from 'yup';
import { Formik } from 'formik';
import { spacing } from '@mui/system';
import { login } from '../../services/authService'; // Import the login function
import Logo from '../../vendor/logo.svg'

import {
  Alert as MuiAlert,
  Button,
  TextField as MuiTextField,
} from '@mui/material';
const TextField = styled(MuiTextField)(spacing);
const theme = createTheme({
  palette: {
    background: {
      default: 'rgb(35, 48, 68)', // Dark background color
    },
    text: {
      primary: '#FFF', // White text color
    },
  },
})

const GlobalStyle = styled(Box)(({ theme }) => ({
  height: '100vh',
  width: '100vw',
  padding: 0,
  margin: 0,
  backgroundColor: 'rgb(35, 48, 68)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  overflow: 'hidden',
}))

const Brand = styled(Logo)({
  // If Logo is an SVG file
  width: '150px', // Adjust size as needed
  height: 'auto', // Adjust size as needed
  margin: '32px auto',
})

const Wrapper = styled(Box)({
  textAlign: 'center',
})

const PinDigitInput = styled(TextField)(({ theme }) => ({
  '& input': {
    color: theme.palette.text.primary, // Text color for input
    backgroundColor: 'transparent', // No background color
    border: '1px solid', // Simple border
    borderColor: theme.palette.text.primary, // Border color same as text
    borderRadius: '4px', // Slight rounded corners if needed
    padding: '10px', // Padding inside the input box
    textAlign: 'center', // Center the text
    fontSize: '1.5rem', // Font size for the input
    width: '2.5rem', // Width of the input field
    height: '2.5rem', // Height of the input field
    margin: theme.spacing(1), // Margin around the input fields

    // Remove Material-UI input styles
    '&:hover': {
      borderColor: theme.palette.text.primary, // Border color on hover
    },
    '&:focus': {
      borderColor: theme.palette.primary.main, // Border color when focused
    },
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none', // Remove the default Material-UI border
    },
  },
}))



const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(5),
  marginLeft: theme.spacing(0.05),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))
function PinCode() {
  const router = useRouter();
  const { email } = router.query;
  const handlePinChange = (event, index, setFieldValue, values) => {
    // Get the value of the current input
    const value = event.target.value;

    // Update the pin string based on the index of the input
    const newPin = values.pin.split('');
    newPin[index] = value[0] || ''; // Grab the first character or empty string if no value
    setFieldValue('pin', newPin.join(''));

    // Focus the next input field if a number was entered
    if (value && index < 3) {
      document.getElementById(`pin-${index + 1}`).focus();
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle>
        <Helmet title="Enter PIN" />
        <Brand src={Logo} alt="banana.ai logo" />
        <Wrapper>
        <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
              Welcome
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'white', marginBottom: '2rem' }}
            >
              Please enter your pin code
            </Typography>
            </Wrapper>
        <Formik
          initialValues={{
            email: email || '', // Pre-fill the email if available
            pin: '',
            submit: false,
          }}
          validationSchema={Yup.object().shape({
            pin: Yup.string().length(4, 'PIN must be exactly 4 digits').matches(/^[0-9]+$/, "PIN must be numeric").required('PIN is required'),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              const response = await login(values.email, values.pin);

              // Store tokens in localStorage or handle session management
              localStorage.setItem('accessToken', response.access_token);
          localStorage.setItem('refreshToken', response.refresh_token);

              // Redirect based on the user role
              const userRole = response.user.role;
              switch (userRole) {
                case 'admin':
                  router.push('/dashboard/admin');
                  break;
                case 'inspector':
                  router.push('/pages/scancabinid');
                  break;
                default:
                  router.push('/');
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
            setFieldValue,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2} justifyContent="center">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Grid item key={index}>
                    <PinDigitInput
                      type="tel"
                      name={`pin-${index}`}
                      id={`pin-${index}`}
                      value={values.pin[index] || ''}
                      onChange={(event) => handlePinChange(event, index, setFieldValue, values)}
                      inputProps={{ maxLength: 1, pattern: "[0-9]*" }}
                      autoComplete="off"
                    />
                  </Grid>
                ))}
              </Grid>
              <StyledButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Verify PIN
              </StyledButton>
            </form>
          )}
        </Formik>
      </GlobalStyle>
    </ThemeProvider>
  );
}

export default PinCode
