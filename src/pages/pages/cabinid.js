import React, { useState } from 'react'
import { useRouter } from 'next/router' // Import the useRouter hook from next/router

import {
  CssBaseline,
  Container,
  Typography,
  Button,
  TextField,
  Box,
} from '@mui/material'
import { ThemeProvider, createTheme, styled } from '@mui/material/styles'
import { Global, css } from '@emotion/react'

import Logo from '../../vendor/logo.svg'

const Brand = styled(Logo)({
  // If Logo is an SVG file
  width: '150px', // Adjust size as needed
  height: 'auto', // Adjust size as needed
  margin: '32px auto',
})
// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff', // This is the blue shade used for the button, adjust as needed
    },
    background: {
      default: 'rgb(35, 48, 68)', // This is the background color, adjust as needed
    },
    text: {
      primary: '#fff',
    },
  },
})

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',

  backgroundColor: 'rgb(35, 48, 68)',
  textAlign: 'center',
  padding: theme.spacing(4),
})

const StyledButton = styled(Button)({
  margin: theme.spacing(2),
  color: theme.palette.text.primary,
})

function CabinId() {
  const [cabinId, setCabinId] = useState('')
  const [showInput, setShowInput] = useState(false)
  const router = useRouter() // Use the useRouter hook for navigation

  // Event handler functions
  const handleScan = () => {
    // Implement scan functionality
  }

  const handleManualEntryClick = () => {
    // Show the input field for manual entry
    setShowInput(true)
  }

  const handleManualEntryChange = (event) => {
    // Update the cabin ID state
    setCabinId(event.target.value)
    if (event.target.value === '123') {
      // Navigate to the dashboard when '123' is entered
      router.push('/inspectordashboard/inspectordashboard') // Adjust the path as needed for your routing setup
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledContainer maxWidth="sm">
        <Brand />
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the banana.ai inspection
        </Typography>
        <Typography variant="h6" gutterBottom>
          Start inspection by scanning or entering cabin ID.
        </Typography>
        <StyledButton
          variant="contained"
          size="large"
          onClick={handleScan}
          fullWidth
        >
          Scan Cabin ID
        </StyledButton>
        <b
          variant="outlined"
          size="large"
          onClick={handleManualEntryClick}
          fullWidth
        >
          Enter Cabin ID Manually
        </b>
        {showInput && (
          <TextField
            id="cabin-id-input"
            label="Cabin ID"
            variant="outlined"
            value={cabinId}
            onChange={handleManualEntryChange}
            fullWidth
            margin="normal"
          />
        )}
      </StyledContainer>
    </ThemeProvider>
  )
}

export default CabinId
