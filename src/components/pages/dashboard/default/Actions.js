import React, { useState } from 'react';
import styled from '@emotion/styled';

import { Button as MuiButton, Menu, MenuItem } from '@mui/material';
import {
  Loop as LoopIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import { spacing } from '@mui/system';

const Button = styled(MuiButton)(spacing);

const SmallButton = styled(Button)`
  padding: 4px;
  min-width: 0;

  svg {
    width: 0.9em;
    height: 0.9em;
  }
};`

function Actions() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Get the current date and format it as 'DD Month'
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <React.Fragment>
      <SmallButton size="small" mr={2}>
        <LoopIcon />
      </SmallButton>
      <SmallButton size="small" mr={2}>
        <FilterListIcon />
      </SmallButton>
      <Button
        variant="contained"
        color="secondary"
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        Today: {formattedDate}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Today</MenuItem>
        <MenuItem onClick={handleClose}>Yesterday</MenuItem>
        <MenuItem onClick={handleClose}>Last 7 days</MenuItem>
        <MenuItem onClick={handleClose}>Last 30 days</MenuItem>
        <MenuItem onClick={handleClose}>This month</MenuItem>
        <MenuItem onClick={handleClose}>Last month</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default Actions;
