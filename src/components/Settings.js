import React, { useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Link from 'next/link'

import { green, grey, indigo } from '@mui/material/colors'
import { Palette as PaletteIcon } from '@mui/icons-material'
import {
  Alert,
  Box,
  Button,
  Drawer,
  Fab as MuiFab,
  Grid,
  ListItemButton,
  Typography,
} from '@mui/material'

import { THEMES } from '../constants'
import useTheme from '../hooks/useTheme'

function Settings() {
  const [state, setState] = useState({
    isOpen: false,
  })

  const toggleDrawer = (open) => () => {
    setState({ ...state, isOpen: open })
  }

  return <React.Fragment></React.Fragment>
}

export default Settings
