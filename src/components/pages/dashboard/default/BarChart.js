import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { withTheme } from '@emotion/react';
import { Bar } from 'react-chartjs-2';
import { CardContent, Card as MuiCard, Typography } from '@mui/material';
import { spacing } from '@mui/system';
import { inpsectionPointSummary } from '../../../../services/inspectionService';



const Card = styled(MuiCard)(spacing);
const Spacer = styled.div(spacing);
const ChartWrapper = styled.div`
  height: 485px;
  width: 100%;
`;

const HorizontalBarChart = ({ theme }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await inpsectionPointSummary();

      const labels = data.map(item => item.name);
      const completeData = data.map(item => item.complete);
      const incompleteData = data.map(item => item.incomplete);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Complete points',
            backgroundColor: theme.palette.success.main,
            borderColor: theme.palette.success.main,
            borderWidth: 1,
            data: completeData,
          },
          {
            label: 'Incomplete points',
            backgroundColor: theme.palette.error.main,
            borderColor: theme.palette.error.main,
            borderWidth: 1,
            data: incompleteData,
          },
        ]
      });
    };

    fetchData();
  }, [theme]);

  const options = {
    indexAxis: 'y',
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
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          color: 'white',
          stepSize: 1,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          color: 'white',
        },
      },
    },
  };

  return (
    <Card mb={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Inspection Points Breakdown
        </Typography>
        <Typography variant="body2" gutterBottom>
          Performance of individual inspection points.
        </Typography>

        <Spacer mb={6} />

        <ChartWrapper>
          <Bar data={chartData} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
};

export default withTheme(HorizontalBarChart);
