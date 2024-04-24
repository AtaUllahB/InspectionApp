import React from 'react'
import styled from '@emotion/styled'
import { Helmet } from 'react-helmet-async'

import { Paper, Typography } from '@mui/material'

import AuthLayout from '../../layouts/Auth'

import SignUpComponent from '../../components/auth/SignUp'

import Logo from '../../vendor/logo.svg'

const Brand = styled(Logo)`
  fill: ${(props) => props.theme.palette.primary.main};
  width: 200px;
  height: 200px;
  margin-bottom: 32px;
`

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};

  ${(props) => props.theme.breakpoints.up('md')} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`

function SignUp() {
  return (
    <React.Fragment>
      <Brand />
      <Wrapper>
        <Helmet title="Sign Up" />

        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Register Cabin Inspector
        </Typography>
        <Typography component="h2" variant="body1" align="center"></Typography>

        <SignUpComponent />
      </Wrapper>
    </React.Fragment>
  )
}

SignUp.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>
}

export default SignUp
