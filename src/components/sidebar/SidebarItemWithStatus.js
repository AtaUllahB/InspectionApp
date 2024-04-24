import React from 'react';
import styled from '@emotion/styled';
import { Sliders } from 'react-feather';
import { green, red, amber, grey } from '@mui/material/colors';
import { ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { useActiveTitle } from '../../contexts/ActiveTitleContext';
// StatusCircle and getStatusColor definitions remain the same

const StatusCircle = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px; // Size of the status circle
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 8px; // Space between the status circle and the title
  position: relative; // Needed to position the slider icon correctly
`;

const SliderIcon = styled(Sliders)`
  position: absolute;
  color: white;
`;

const getStatusColor = (status) => {
  switch (status) {
    case 'complete':
      return green[500];
    case 'partial':
      return amber[500];
    case 'incomplete':
      return red[500];
    default:
      return grey[500]; // Default color if no status is provided
  }
};

const CustomListItemButton = styled(({ isActive, ...otherProps }) => <ListItemButton {...otherProps} />)`
  background-color: ${props => props.isActive ? 'rgba(0, 0, 0, 0.1)' : 'inherit'}; // subtle background for active but not changing text color
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.09); // This applies to both active and inactive items
  }
`;

const SidebarItemWithStatus = ({ title, status }) => {
    const { activeTitle, setActiveTitle } = useActiveTitle();
    const isActive = title === activeTitle;
    
  
    const statusColor = getStatusColor(status);
  
    return (
      <ListItem disablePadding>
        <CustomListItemButton isActive={isActive}>
          <ListItemIcon>
            <StatusCircle color={statusColor}>
              <SliderIcon size={20} />
            </StatusCircle>
          </ListItemIcon>
          <ListItemText primary={title} />
        </CustomListItemButton>
      </ListItem>
    );
  };
  
  export default SidebarItemWithStatus;
