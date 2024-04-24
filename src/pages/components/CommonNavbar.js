import React from 'react'
import styled from '@emotion/styled'
import { darken } from 'polished'
import { Search as SearchIcon } from 'react-feather'

import {
  Grid,
  InputBase,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
} from '@mui/material'

import { Menu as MenuIcon } from '@mui/icons-material'

import NavbarNotificationsDropdown from '../../components/navbar/NavbarNotificationsDropdown'
import NavbarMessagesDropdown from '../../components/navbar/NavbarMessagesDropdown'
import NavbarLanguagesDropdown from '../../components/navbar/NavbarLanguagesDropdown'
import NavbarUserDropdown from '../../components/navbar/NavbarUserDropdown'
import Logo from '../../vendor/logo.svg'

const Brand = styled(Logo)({
  // If Logo is an SVG file
  width: '100px', // Adjust size as needed
  height: 'auto', // Adjust size as needed
  margin: '10px auto',
})
const AppBar = styled(MuiAppBar)`
  background: rgb(27,38,53);
  color: ${(props) => props.theme.header.color};
`

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`

const Search = styled.div`
  border-radius: 2px;
  background-color: ${(props) => props.theme.header.background};
  display: none;
  position: relative;
  width: 100%;

  &:hover {
    background-color: ${(props) => darken(0.05, props.theme.header.background)};
  }

  ${(props) => props.theme.breakpoints.up('md')} {
    display: block;
  }
`

const SearchIconWrapper = styled.div`
  width: 50px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 22px;
  }
`

const Input = styled(InputBase)`
  color: inherit;
  width: 100%;

  > input {
    color: ${(props) => props.theme.header.search.color};
    padding-top: ${(props) => props.theme.spacing(2.5)};
    padding-right: ${(props) => props.theme.spacing(2.5)};
    padding-bottom: ${(props) => props.theme.spacing(2.5)};
    padding-left: ${(props) => props.theme.spacing(12)};
    width: 160px;
  }
`

const Navbar = ({ onDrawerToggle }) => {

  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={0} >
        <Toolbar>
          <Grid container alignItems="left">
            
            <Brand />
            <Grid item xs />
            <Grid item>
              
              <NavbarUserDropdown />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default Navbar
