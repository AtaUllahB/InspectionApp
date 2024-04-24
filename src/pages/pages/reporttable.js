import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { LinearProgress,Box, CssBaseline, Typography, Button, AppBar, Toolbar, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomizedTables from '../tables/advanced-table';
import Logo from '../../vendor/logo.svg';
import { useRouter } from 'next/router';
import Navbar from '../components/CommonNavbar'; // Adjust the import path as necessary
import { useCabin } from '../../contexts/CabinContext'; // Adjust the path as necessary

// Full screen box container with flex styles
const FullScreenBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#1b2635', // Dark background color
  padding: '20px 0', // Padding top and bottom
  margin: 0, // No margins
});
const ProgressContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  background: '#1b2635', // Dark background as seen in the image
  padding: '4px 8px', // Adjust padding to match your design
  borderRadius: '20px', // Rounded corners as seen in the image
});
const StyledLinearProgress = styled(LinearProgress)({
  flexGrow: 1,
  height: '5px', // Thin progress bar as seen in the image
  borderRadius: '1px', // Rounded corners for the progress bar
  backgroundColor: 'rgba(255, 255, 255, 0.3)', // Light background for the progress bar track
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#fff', // White progress bar as seen in the image
  },
});

const Blank = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false); // State to manage Snackbar visibility
  const progress = 0;// 50% for demonstration
  const { cabinId } = useCabin(); // This hooks into the context to get the current cabinId
  const handleSubmit = (event) => {
    event.preventDefault();
    // Show success message
    setOpen(true);
    
    // Wait for 2 seconds before navigating
    setTimeout(() => {
      router.push('/pages/scancabinid');// Navigate to the next page
    }, 2000);
  };

  // Function to close Snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Navbar />
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <Helmet title="Blank" />
      <FullScreenBox>
     
        <Typography variant="h1" component="div" sx={{ color: 'white', mb: 6 }}>
          Scanning Report Summary
        </Typography>
        {/* <ProgressContainer sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, margin: '0 8px' , width: '70%' }}>
  {/* Typography for Cabin# */}
  {/* <Typography variant="body2" color="white" sx={{ marginBottom: '8px', fontSize: '0.875rem', alignSelf: 'flex-center' }}>
    Cabin# {cabinId}
  </Typography> */}
  
  {/* Progress Bar */}
  {/* <StyledLinearProgress variant="determinate" value={progress} sx={{ width: '95%' }} />
</ProgressContainer> */}
        <Box sx={{ width: '100%', maxWidth: '960px' }}>
          <CustomizedTables />
          <Button 
            fullWidth
            variant="contained" 
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
        
        {/* Snackbar for success message */}
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Report submitted successfully"
        />
      </FullScreenBox>
    </React.Fragment>
  );
};

export default Blank;
