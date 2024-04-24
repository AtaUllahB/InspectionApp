import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { List } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import SidebarNavSection from './InspectorSidebarNavSection'
import SidebarNavListItem from './InspectorSidebarNavListItem'
const baseScrollbar = (props) => css`
  background-color: ${props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  flex-grow: 1;
`

const Scrollbar = styled.div`
  ${baseScrollbar}
`

const Items = styled.div`
  padding-top: ${(props) => props.theme.spacing(2.5)};
  padding-bottom: ${(props) => props.theme.spacing(2.5)};
`

const SidebarNav = ({ items }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  return (
      <List disablePadding>
      {items.map((item, index) => (
        <SidebarNavListItem
          key={index}
          title={item.title}

          icon={item.icon}
          status={item.status}
        />
      ))}
    </List>
  )
}

export default SidebarNav
