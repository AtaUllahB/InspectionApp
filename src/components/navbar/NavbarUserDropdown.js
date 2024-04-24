import React from 'react';
import styled from '@emotion/styled';
import { Power } from 'react-feather';
import { useRouter } from 'next/router';
import { useCamera } from '../../contexts/CameraContext'; // Adjust the path as needed

import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
} from '@mui/material';

import useAuth from '../../hooks/useAuth';

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;


function NavbarUserDropdown() {
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const router = useRouter();
  const { logout } = useAuth(); // Assumed to be provided by useAuth
  const { stopCameraStream } = useCamera();
//console.log(stopCameraStream);

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };


  const handleSignOut = async () => {
    try {
      await logout();
      stopCameraStream(); 
         router.push('/auth/select-account');
    } catch (error) {
      console.error('Error signing out:', error);
      // Handle sign out error (optional)
    }
  };
  return (
    <React.Fragment>
      <Tooltip title="Account">
        <IconButton
          aria-owns={Boolean(anchorMenu) ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
          size="large"
        >
          <Power />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        {/* <MenuItem onClick={closeMenu}>Profile</MenuItem> */}
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default NavbarUserDropdown;
