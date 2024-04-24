import React from 'react'
import styled from '@emotion/styled'
import { withTheme } from '@emotion/react'
import { Doughnut } from 'react-chartjs-2'
import { MoreVertical } from 'react-feather'

import { orange, green, red } from '@mui/material/colors'
import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  IconButton,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableHead,
  TableRow as MuiTableRow,
  Typography,
} from '@mui/material'
import { spacing } from '@mui/system'

const Card = styled(MuiCard)(spacing)

const ChartWrapper = styled.div`
  height: 168px;
  position: relative;
`

const DoughnutInner = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -22px;
  text-align: center;
  z-index: 0;
`

const TableRow = styled(MuiTableRow)`
  height: 42px;
`

const TableCell = styled(MuiTableCell)`
  padding-top: 0;
  padding-bottom: 0;
`

const GreenText = styled.span`
  color: ${() => green[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`

const RedText = styled.span`
  color: ${() => red[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`

const DoughnutChart = ({ theme }) => {
  const data = {
    labels: ['Total Points', 'Pending Points', 'Resolved Points'],
    datasets: [
      {
        data: [260, 125, 54],
        backgroundColor: [
          theme.palette.secondary.main,
          red[500],
          orange[500],
          theme.palette.grey[200],
        ],
        borderWidth: 5,
        borderColor: theme.palette.background.paper,
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: 'white',
        },
      },
    },
    cutout: '80%',
  }

  return (
    <Card mb={6}>
      <CardHeader
        action={
          <IconButton aria-label="settings" size="large">
            <MoreVertical />
          </IconButton>
        }
        title="Previous Issues"
      />

      <CardContent>
        <ChartWrapper>
          <DoughnutInner>
            <Typography variant="h4"></Typography>
            <Typography variant="caption"></Typography>
          </DoughnutInner>
          <Doughnut data={data} options={options} />
        </ChartWrapper>
        {/* <Table>
          <TableHead>
            <TableRow>
              <TableCell>Source</TableCell>
              <TableCell align="right">Revenue</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                ToTal Issues
              </TableCell>
              <TableCell align="right">260</TableCell>
              <TableCell align="right">
                <GreenText>+35%</GreenText>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Pending Issues
              </TableCell>
              <TableCell align="right">125</TableCell>
              <TableCell align="right">
                <RedText>-12%</RedText>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Resolved Issues
              </TableCell>
              <TableCell align="right">54</TableCell>
              <TableCell align="right">
                <GreenText>+46%</GreenText>
              </TableCell>
            </TableRow>
            
          </TableBody>
        </Table> */}
      </CardContent>
    </Card>
  )
}

export default withTheme(DoughnutChart)
