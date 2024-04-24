import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from '@emotion/styled';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CheckCircle, Error, Warning } from '@mui/icons-material';
import { green, red, amber } from '@mui/material/colors';

// Styled components for icons
const StatusIcon = styled.span`
  color: ${({ status }) => {
    switch (status) {
      case 'complete':
        return green[500];
      case 'partial':
        return amber[500];
      case 'incomplete':
        return red[500];
      default:
        return 'inherit';
    }
  }};
`;

// Define how each sidebar item should be rendered
const SidebarItem = ({ title, href, status }) => (
  <ListItem button component={Link} href={href}>
    <ListItemText primary={title} />
    {status && <ListItemIcon><StatusIcon status={status} /></ListItemIcon>}
  </ListItem>
);

const InspectorSidebarNavList = ({ pages }) => {
  // Assuming pages is an array of page objects { title, href, status }
  return pages.map((page, index) => (
    <SidebarItem key={index} title={page.title} href={page.href} status={page.status} />
  ));
};

InspectorSidebarNavList.propTypes = {
  pages: PropTypes.array.isRequired,
};

export default InspectorSidebarNavList;
