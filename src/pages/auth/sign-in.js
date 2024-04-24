import React from 'react';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet-async';

import { Avatar, Typography, CssBaseline } from '@mui/material';

import AuthLayout from '../../layouts/Auth';

import SignInComponent from '../../components/auth/SignIn';

import Logo from '../../vendor/logo.svg';

const Brand = styled(Logo)`
  fill: ${(props) => props.theme.palette.primary.main};
  width: 200px;
  height: 200px;
  margin-bottom: 32px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const FullScreenWrapper = styled('div')`
  height: 100vh; // Full view height
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.palette.background.paper}; // Set the background color
  color: ${(props) => props.theme.palette.text.primary}; // Set the text color
  padding: 0;
  margin: 0;
  width: 100%; // Full width
  position: absolute; // Position it on top
  top: 0;
  left: 0;
  overflow: hidden; // Prevent scrolling
`;

const StyledSignInComponent = styled('div')`
  width: 100%; // Prevent stretching
  max-width: 360px; // Maximum width for the sign-in component
  display: block; // Use block display
  margin: 0 auto; // Center in the available space
`;

const BigAvatar = styled(Avatar)`
  width: 92px;
  height: 92px;
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing(5)};
`;

function SignIn() {
  return (
    <FullScreenWrapper>
      <CssBaseline /> {/* Ensures consistent baseline styles */}
      <Helmet title="Sign In" />
      <Brand />
      {/* <BigAvatar alt="Lucy" src="/static/img/avatars/avatar-1.jpg" /> */}
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Welcome 
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        Sign in to your account to continue
      </Typography>
      <StyledSignInComponent>
        <SignInComponent />
      </StyledSignInComponent>
    </FullScreenWrapper>
  );
}

SignIn.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
}

export default SignIn;
