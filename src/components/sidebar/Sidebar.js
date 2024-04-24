import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'

import { green } from '@mui/material/colors'

import { Box, Chip, Drawer as MuiDrawer, ListItemButton } from '@mui/material'

import Logo from '../../vendor/logo.svg'

import FooterOne from './SidebarFooter'
import FooterTwo from './InspectorSidebarFooter'
import SidebarNav from './SidebarNav'

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`

const Brand = styled(ListItemButton)`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  color: ${(props) => props.theme.sidebar.header.color};
  background-color: ${(props) => props.theme.sidebar.header.background};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${(props) => props.theme.spacing(6)};
  padding-right: ${(props) => props.theme.spacing(6)};
  padding-top: ${(props) => props.theme.spacing(0)};
  justify-content: center;
  cursor: pointer;
  flex-grow: 0;

  ${(props) => props.theme.breakpoints.up('sm')} {
    min-height: 64px;
  }

  &:hover {
    background-color: ${(props) => props.theme.sidebar.header.background};
  }
`

const BrandIcon = styled(Logo)`
  margin-right: ${(props) => props.theme.spacing(2)};
  color: ${(props) => props.theme.sidebar.header.brand.color};
  fill: ${(props) => props.theme.sidebar.header.brand.color};
  width: 100px;
  height: 100px;
`

const BrandChip = styled(Chip)`
  background-color: ${green[700]};
  border-radius: 5px;
  color: ${(props) => props.theme.palette.common.white};
  font-size: 55%;
  height: 18px;
  margin-left: 2px;
  margin-top: -16px;
  padding: 3px 0;

  span {
    padding-left: ${(props) => props.theme.spacing(1.375)};
    padding-right: ${(props) => props.theme.spacing(1.375)};
  }
`

const Sidebar = ({ items, footerType, ...rest }) => {
  const getFooter = () => {
    switch (footerType) {
      case 'typeOne':
        return <FooterOne />;
      case 'typeTwo':
        return <FooterTwo />;
      default:
        FooterOne
    }
  };
  return (

    <Drawer variant="permanent" {...rest}>
    <Brand component={Link} href="/">
      <BrandIcon /> <Box ml={1}></Box>
    </Brand>
    <SidebarNav items={items} />
    {getFooter()} 
  </Drawer>
  )
}

export default Sidebar
