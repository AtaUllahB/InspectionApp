import React from 'react';
import styled from '@emotion/styled';
import { Badge, Grid, Avatar, Typography, Button ,Box} from '@mui/material';
import { useRouter } from 'next/router';
const Footer = styled.div`
  background-color: ${(props) => props.theme.sidebar.footer.background} !important;
  padding: ${(props) => props.theme.spacing(2.75)} ${(props) => props.theme.spacing(4)};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: space-between; /* Adjusted to space out footer content and buttons */
`;


const SidebarFooter = ({ ...rest }) => {
  // const { user } = useAuth();
  const router = useRouter(); // Initialize useRouter

  const handleCancelClick = () => {
    router.push('/pages/scancabinid'); // Use router.push to navigate
  };
  return (
    <Footer {...rest}>
    
    <Box display="flex" flexDirection="row" alignItems="center">
    <Button
        variant="outlined"
        onClick={handleCancelClick}
        sx={{
          color: '#db493a',
          borderColor: '#db493a',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: '#db493a', // This is the hover background color
            borderColor: '##db493a', // This is the hover border color
            color: 'white', // Text color will remain white on hover
          },
          borderRadius: 70, // This will make the button oval-shaped
          textTransform: 'none', // Prevent uppercase styling from Material-UI
        }}
      >
        Cancel Inspection
      </Button>
     
    </Box>
    </Footer>
  );
};

export default SidebarFooter;