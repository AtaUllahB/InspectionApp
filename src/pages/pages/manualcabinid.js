import React, { useState } from 'react';
import { Box, Button, Typography, TextField, useTheme,AppBar,Toolbar } from '@mui/material';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Logo from '../../vendor/logo.svg';
const FullHeightContainer = styled(Box)`
  height: 100vh; // Full viewport height
  width: 100vw; // Full viewport width
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #233044; // Dark blue background
  margin: 0;
  padding: 0;
  position: absolute; // Ensure it covers the entire screen
  top: 0;
  left: 0;
  overflow: hidden; // Prevent scrolling
`;

const ActionButton = styled(Button)`
  margin: ${({ theme }) => theme.spacing(2)};
  width: auto; // Ensure the buttons are only as wide as their content
`;

const Brand = styled(Logo)({
    width: '100px',
    height: 'auto',
    margin: '32px auto',
  });
  

const StyledTextField = styled(TextField)`
  && .MuiInputBase-input {
    color: white; // White text for input
  }
  && .MuiInputLabel-root {
    color: white; // White text for label
  }
  && .MuiOutlinedInput-root {
    fieldset {
      borderColor: white; // White border
    }
    &:hover fieldset {
      borderColor: white; // White border when hovering
    }
  }
  background-color: rgba(255, 255, 255, 0.2); // Transparent background
  border-radius: 4px; // Rounded corners for the input field
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const CabinIdInput = () => {
  const [showTextField, setShowTextField] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const handleEnterCabinId = () => {
    setShowTextField(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    router.push('/inspectordashboard/inspectordashboard');
  };

  return (
  
    <FullHeightContainer>
        <Brand/>
     
      <Typography variant="h5" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
        Scan Cabin ID or enter manually
      </Typography>
      <ActionButton theme={theme} variant="contained" color="primary" onClick={() => { /* Scanning logic */ }}>
        Scan Cabin ID
      </ActionButton>
      <ActionButton theme={theme} variant="outlined" color="primary" onClick={handleEnterCabinId}>
        Enter Cabin ID Manually
      </ActionButton>
      {showTextField && (
        <form onSubmit={handleFormSubmit}>
          <StyledTextField
            theme={theme}
            autoFocus
            fullWidth
            color="primary"
            variant="outlined"
            label="Cabin ID"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleFormSubmit(e);
              }
            }}
          />
        </form>
      )}
    </FullHeightContainer>
  );
};

export default CabinIdInput;
