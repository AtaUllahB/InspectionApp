import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled'
import { withTheme } from '@emotion/react'
import dynamic from 'next/dynamic'

import { CardContent, Card as MuiCard, Typography } from '@mui/material'
import { spacing } from '@mui/system'
import { getInspectionSummaries } from '../../../../services/inspectionService';


const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const Card = styled(MuiCard)(spacing)

const Spacer = styled.div(spacing)

const ChartWrapper = styled.div`
  height: 350px;
  width: 100%;
`
const AreaChart = ({ theme }) => {
  const [chartData, setChartData] = useState({
    complete: [],
    incomplete: [],
    categories: []
  });

  useEffect(() => {
    const fetchData = async () => {

      const data = await getInspectionSummaries();

      // Process your data to fit into the chart
      const complete = [];
      const incomplete = [];
      const categories = [];

      data.completeInspections.forEach(item => {
        categories.push(new Date(item.time).toLocaleTimeString());
        complete.push(item.count);
      });

      data.incompleteInspections.forEach(item => {
        incomplete.push(item.count);
      });

      setChartData({ complete, incomplete, categories });
    };

    fetchData();
  }, []);

  const data = [
    {
      name: 'Complete inspections',
      data: chartData.complete, // Updated to use state
    },
    {
      name: 'Incomplete inspections',
      data: chartData.incomplete, // Updated to use state
    },
  ];

  const options = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'category',
      categories: chartData.categories, // Updated to use state
      labels: {
        style: {
          colors: '#FFFFFF',
        },
      },
    },
    tooltip: {
      x: {
        format: 'HH:mm',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.5,
        stops: [0, 90, 100],
      },
    },
    colors: [
      theme.palette.success.main,
      theme.palette.error.main,
    ],
    legend: {
      labels: {
        colors: '#FFFFFF',
      },
      show: true,
      position: 'top',
      horizontalAlign: 'left',
    },
    yaxis: {
      min: 0,
      max: 60,
      tickAmount: 6,
      labels: {
        style: {
          colors: '#FFFFFF',
        },
      },
    },
  };

  return (
    <Card mb={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Inspection Performance
        </Typography>
        <Typography variant="body2" gutterBottom>
          The number of houses that have complete and the number that have incomplete inspections.
        </Typography>

        <Spacer mb={6} />

        <ChartWrapper>
          <Chart options={options} series={data} type="area" height="350" />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
};

export default withTheme(AreaChart);