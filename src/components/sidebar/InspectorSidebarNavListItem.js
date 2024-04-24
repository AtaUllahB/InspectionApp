import React from 'react'
import styled from '@emotion/styled'
import { rgba, darken } from 'polished'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ListItemButton, ListItemText } from '@mui/material';
import { CheckCircle, Error, Warning } from '@mui/icons-material';
import { green, red, amber,grey} from '@mui/material/colors';
import { Chip, Collapse} from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'

const Item = styled(ListItemButton)`
  padding-top: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 2 : 3)};
  padding-bottom: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 2 : 3)};
  padding-left: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 14 : 8)};
  padding-right: ${(props) =>
    props.theme.spacing(props.depth && props.depth > 0 ? 4 : 7)};
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};
  svg {
    color: ${(props) => props.theme.sidebar.color};
    font-size: 20px;
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.08);
    color: ${(props) => props.theme.sidebar.color};
  }
  &.${(props) => props.activeclassname} {
    background-color: ${(props) =>
      darken(0.03, props.theme.sidebar.background)};
    span {
      color: ${(props) => props.theme.sidebar.color};
    }
  }
`

 const Title = styled(ListItemText)`
   margin: 0;
  span {
     color: ${(props) =>
       rgba(
         props.theme.sidebar.color,
         props.depth && props.depth > 0 ? 0.7 : 1
       )};
     font-size: ${(props) => props.theme.typography.body1.fontSize}px;
   padding: 0 ${(props) => props.theme.spacing(4)};
   }
 `

const Badge = styled(Chip)`
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  height: 20px;
  position: absolute;
  right: 26px;
  top: 12px;
  background: ${(props) => props.theme.sidebar.badge.background};
  z-index: 1;
  span.MuiChip-label,
  span.MuiChip-label:hover {
    font-size: 11px;
    cursor: pointer;
    color: ${(props) => props.theme.sidebar.badge.color};
    padding-left: ${(props) => props.theme.spacing(2)};
    padding-right: ${(props) => props.theme.spacing(2)};
  }
`

const ExpandLessIcon = styled(ExpandLess)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`

const ExpandMoreIcon = styled(ExpandMore)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`
const StatusIcon = styled.span`
  margin-left: 8px;
  display: flex;
  align-items: center;
`;

const getStatusIcon = (status) => {
  switch (status) {
    case 'complete':
      return <CheckCircle style={{ color: green[500] }} />;
    case 'partial':
      return <Warning style={{ color: amber[500] }} />;
    case 'incomplete':
      return <Error style={{ color: red[500] }} />;
    default:
      return <CheckCircle style={{ color: grey[500] }} />;
  }
};
const SidebarNavListItem = ({ titles, icon: Icon, status }) => {
 

  return (
    
      <Item>
        {Icon && <Icon />}
        <Title>{titles}</Title>
        {status && <StatusIcon>{getStatusIcon(status)}</StatusIcon>}
      </Item>
    
  );
};

export default SidebarNavListItem