import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled'
import { Helmet } from 'react-helmet-async'

import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from '@mui/material'
import { spacing } from '@mui/system'
import { green, red } from '@mui/material/colors'

import DashboardLayout from '../../layouts/Dashboard'

import Actions from '../../components/pages/dashboard/default/Actions'
import BarChart from '../../components/pages/dashboard/default/BarChart'
import LineChart from '../../components/pages/dashboard/default/LineChart'
import AreaChart from '../../components/pages/dashboard/default/AreaChart'
import DoughnutChart from '../../components/pages/dashboard/default/DoughnutChart'
import Stats from '../../components/pages/dashboard/default/Stats'
import Table from '../../components/pages/dashboard/default/Table'
import { countsSummary } from '../../services/inspectionService';


const Divider = styled(MuiDivider)(spacing)

const Typography = styled(MuiTypography)(spacing)

function Default() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const json = await countsSummary();
        setData(json);
        console.log(data)
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Helmet title="Default Dashboard" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="subtitle1">
            {('Welcome back')}, {("")}
            <span role="img" aria-label="Waving Hand Sign">
              👋
            </span>
          </Typography>
        </Grid>

        <Grid item>
          <Actions />
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Complete Inspections"
            amount={data["complete_inspections"]}
            chip="Today"
            percentagetext="+26%"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Monthly Counts"
            amount={data["monthly_count"]}
            chip="Today"
            percentagetext="-14%"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Incomplete Inspections"
            amount={data["incomplete_inspections"]}
            chip="Today"
            percentagetext="+18%"
            percentagecolor={red[500]}
          />
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={12}>
          <AreaChart />
        </Grid>

        <Grid item xs={12} md={16} lg={8}>
          <BarChart />
        </Grid>

        <Grid item xs={12} lg={4}>
          <Grid item xs={10} md={8} lg={12}>
            {/* <DoughnutChart /> */}
          </Grid>
          <Grid item xs={12} md={8} lg={12}>
            <Table />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

Default.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Default
