import React from 'react'
import styled from '@emotion/styled'

import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
} from '@mui/material'

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`

const Flag = styled.img`
  border-radius: 50%;
  width: 22px;
  height: 22px;
`

const languageOptions = {
  en: {
    icon: '/static/img/flags/us.png',
    name: 'English',
  },
  fr: {
    icon: '/static/img/flags/fr.png',
    name: 'French',
  },
  de: {
    icon: '/static/img/flags/de.png',
    name: 'German',
  },
  nl: {
    icon: '/static/img/flags/nl.png',
    name: 'Dutch',
  },
}

function NavbarLanguagesDropdown() {
  const [anchorMenu, setAnchorMenu] = React.useState(null)


  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchorMenu(null)
  }


  return (
    <React.Fragment>
      <Tooltip title="Languages">
        <IconButton
          aria-owns={Boolean(anchorMenu) ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
          size="large"
        >
          <Flag src={selectedLanguage.icon} alt={selectedLanguage.name} />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        {Object.keys(languageOptions).map((language) => (
          <MenuItem
            key={language}
            onClick={() => handleLanguageChange(language)}
          >
            {languageOptions[language].name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  )
}

export default NavbarLanguagesDropdown
