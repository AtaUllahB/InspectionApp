import React, { useState } from 'react';
import { Formik, useFormikContext } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'

import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CssBaseline,
  TextField
} from '@mui/material'
import { ThemeProvider, createTheme, styled } from '@mui/material/styles'
import { Global, css } from '@emotion/react'
import { checkEmail } from '../../services/authService'; // Import the login function
import Logo from '../../vendor/logo.svg'

const Brand = styled(Logo)({
  // If Logo is an SVG file
  width: '150px', // Adjust size as needed
  height: 'auto', // Adjust size as needed
  margin: '32px auto',
})

const globalStyles = css`
  html,
  body,
  #__next {
    padding: 0;
    margin: 0;
    overflow: hidden;
    height: 100%;
    width: 100%;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`

const theme = createTheme({
  palette: {
    background: {
      default: 'rgb(35, 48, 68)',
      paper: '#333', // This should be a dark color for the dropdown background
    },
    text: {
      primary: '#FFF', // This should be a light color for the dropdown text
      secondary: '#AAA',
    },
    primary: {
      main: '#1E88E5',
    },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: '100%', // Makes the FormControl full width
          maxWidth: '300px', // Sets the max-width to align with the button
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          width: '100%', // Makes the Button full width
          maxWidth: '300px', // Sets the max-width to align with the FormControl
        },
      },
    },
  },
})

const BackgroundBox = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
}))

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  '& .MuiOutlinedInput-root': {
    color: theme.palette.common.white, // Text color
    '& fieldset': {
      borderColor: theme.palette.common.white, // Border color
    },
    '&:hover fieldset': {
      borderColor: theme.palette.common.white, // Border hover color
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main, // Border color when focused
    },
  },
  '& .MuiSelect-select': {
    color: theme.palette.common.white, // Text color for the select
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.common.white, // Dropdown icon color
  },
}))

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))


  function SelectAccount() {
    const router = useRouter();
   
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Global styles={globalStyles} />
        <BackgroundBox>
          <Brand src={Logo} alt="banana.ai logo" />
          <Formik
            initialValues={{ email: '' }}
            validationSchema={Yup.object({
              email: Yup.string().email('Invalid email address').required('Email is required'),
            })}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              checkEmail(values.email)
                .then(response => {
                  
                  if (response.message === "Email does not exist") {
                    
                    setErrors({ email: 'Email does not exist' });
                    
                  } else if (response.message === "Email address found") {
                  
                    router.push(`/auth/pin-code?email=${values.email}`);
                   
                  } else {
                
                    setErrors({ email: 'Unexpected response. Please try again.' });
                  }
                })
                .catch(error => {
                
                  setErrors({ email: 'Incorrect email. Please try again.' });
                })
                .finally(() => {
                  setSubmitting(false);
                });
            }}
          >
            {({ handleSubmit, setFieldValue, values, errors, touched, isSubmitting }) => (
              <form onSubmit={handleSubmit} style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <StyledFormControl variant="outlined">
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    value={values.email}
                    onChange={(event) => setFieldValue('email', event.target.value)}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </StyledFormControl>
                <StyledButton type="submit" variant="contained" disabled={isSubmitting}>
                  Next
                </StyledButton>
              </form>
            )}
          </Formik>
        </BackgroundBox>
      </ThemeProvider>
    );
  }
  
  export default SelectAccount
