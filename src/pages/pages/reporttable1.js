import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, CssBaseline, Typography, Button, AppBar, Toolbar, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomizedTables from '../tables/advanced-table1';
import Logo from '../../vendor/logo.svg';
import { useRouter } from 'next/router';
import Navbar from '../components/CommonNavbar'; // Adjust the import path as necessary

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

const Blank = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false); // State to manage Snackbar visibility

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
