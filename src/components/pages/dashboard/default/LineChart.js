import React from 'react'
import styled from '@emotion/styled'
import { withTheme } from '@emotion/react'
import { Line } from 'react-chartjs-2'
import { MoreVertical } from 'react-feather'

import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  IconButton,
} from '@mui/material'
import { spacing } from '@mui/system'
import { alpha } from '@mui/material/styles'

const Card = styled(MuiCard)(spacing)

const ChartWrapper = styled.div`
  height: 378px;
`

function LineChart({ theme }) {
  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Sales ($)',
        fill: true,
        backgroundColor: function (context) {
          const chart = context.chart
          const { ctx, chartArea } = chart

          if (!chartArea) {
            return null
          }

          const gradient = ctx.createLinearGradient(0, 0, 0, 300)
          gradient.addColorStop(0, alpha(theme.palette.secondary.main, 0.0875))
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

          return gradient
        },
        borderColor: theme.palette.secondary.main,
        tension: 0.4,
        data: [21, 15, 15, 18, 87, 99, 66, 48, 80, 38, 91, 33],
      },
      {
        label: 'Inspection no.',
        fill: true,
        backgroundColor: 'transparent',
        borderColor: theme.palette.grey[500],
        borderDash: [4, 4],
        tension: 0.4,
        data: [58, 72, 62, 88, 95, 24, 76, 22, 55, 82, 66, 82],
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(0,0,0,0.0)',
        },
      },
      y: {
        grid: {
          color: 'rgba(0,0,0,0.0375)',
          fontColor: '#fff',
        },
      },
    },
  }

  return (
    <Card mb={6}>
      <CardHeader
        action={
          <IconButton aria-label="settings" size="large">
            <MoreVertical />
          </IconButton>
        }
        title="Inspection Performance 
        number of Cabins that have Complete and the number that have incomplete inspections. "
      />
      <CardContent>
        <ChartWrapper>
          <Line data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  )
}
export default withTheme(LineChart)
