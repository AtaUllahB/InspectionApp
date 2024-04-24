import React from 'react';
import styled from '@emotion/styled';
import { LinearProgress, Box, Typography, Button, AppBar as MuiAppBar, Toolbar, Grid, IconButton } from '@mui/material';
import { Pause as PauseIcon, Menu as MenuIcon } from '@mui/icons-material';
import NavbarNotificationsDropdown from './NavbarNotificationsDropdown';
import NavbarMessagesDropdown from './NavbarMessagesDropdown';
import NavbarLanguagesDropdown from './NavbarLanguagesDropdown';
import NavbarUserDropdown from './NavbarUserDropdown';
// At the top of your InspectorNavbar.js file
import { useCabin } from '../../contexts/CabinContext'; // Adjust the path as necessary

const AppBar = styled(MuiAppBar)`
background: rgba(0,0,0,0.0);
  color: ${(props) => props.theme.header.color};
  
`;

const StyledToolbar = styled(Toolbar)`
  min-height: 48px; // Or any other value to reduce the height
  padding-top: 0; // Remove padding top if needed
  padding-bottom: 0; // Remove padding bottom if needed
  // Adjust the above padding values as necessary
`;

const ProgressContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  background: '#233044',
  padding: '8px 16px',
  borderRadius: '20px',
  marginLeft: `250px`, // Sidebar width
  width: `calc(100% - 700px)`, // Take the full width minus the sidebar width
});

const StyledLinearProgress = styled(LinearProgress)({
  flexGrow: 1,
  height: '10px', // Thin progress bar as seen in the image
  borderRadius: '5px', // Rounded corners for the progress bar
  backgroundColor: 'rgba(255, 255, 255, 0.3)', // Light background for the progress bar track
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#fff', // White progress bar as seen in the image
  },

});

const StyledButton = styled(Button)({
  minWidth: 'auto',
  padding: '6px',
  marginLeft: '16px', // Space between progress bar and button
  backgroundColor: 'red', // Red background for the button
  '&:hover': {
    backgroundColor: 'darkred', // Slightly darker on hover
  },
  '& .MuiButton-label': {
    color: '#fff', // White text/icon color
  },
});


const Navbar = ({ onDrawerToggle }) => {
  // Assume a value for the progress. This would be state in a real app.
  const progress = 0;// 50% for demonstration
  const { cabinId } = useCabin(); // This hooks into the context to get the current cabinId

  return (
    <React.Fragment>
      <AppBar position="absolute" elevation={0}>
        <StyledToolbar>
          <Grid container alignItems="center" wrap="nowrap"> {/* 'nowrap' prevents wrapping */}
            <Grid item sx={{ display: { xs: 'block', md: 'none' } }}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={onDrawerToggle}
                size="large"
              >
                <MenuIcon />
              </IconButton>
            </Grid>

            {/* Progress bar and cabin ID */}
            <ProgressContainer sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, margin: '0 8px' , width: '100%' , height:'40px' }}>
  {/* Typography for Cabin# */}
  <Typography variant="h6" color="white" sx={{ marginBottom: '1px', fontSize: '0.675rem', alignSelf: 'flex-center' }}>
    Cabin# {cabinId}
  </Typography>
  
  {/* Progress Bar */}
  <StyledLinearProgress variant="determinate" value={progress} sx={{ width: '100%' }} />
</ProgressContainer>

            {/* Pause button */}
           {/* <StyledButton onClick={() => {/* Pause functionality here */}
              {/* <PauseIcon /> */}
            {/* </StyledButton> */}

            {/* Rest of the Navbar elements */}
            <NavbarUserDropdown />

            {/* ... other Navbar elements ... */}
          </Grid>
        </StyledToolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
