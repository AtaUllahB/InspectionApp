import React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'

import {
  Grid as MuiGrid,
  Typography as MuiTypography,
  TextField as MuiTextField,
  Button as MuiButton,
} from '@mui/material'
import { spacing } from '@mui/system'

const Grid = styled(MuiGrid)(spacing)
const Typography = styled(MuiTypography)(spacing)
const TextField = styled(MuiTextField)(spacing)
const Button = styled(MuiButton)(spacing)

function Introduction() {
  const router = useRouter()

  return (
    <Formik
      initialValues={{
        accountId: '',
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        accountId: Yup.string().max(255).required('Account ID is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // Handle form submission
        console.log(values)
        setSubmitting(false)
        // You can route to another page after successful submission
        // router.push('/nextPage');
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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center" my={2}>
                Select your account
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="accountId"
                label="Account ID"
                value={values.accountId}
                error={Boolean(touched.accountId && errors.accountId)}
                fullWidth
                helperText={touched.accountId && errors.accountId}
                onBlur={handleBlur}
                onChange={handleChange}
                my={2}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  )
}

export default Introduction
