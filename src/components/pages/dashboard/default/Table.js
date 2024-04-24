import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { MoreVertical } from 'react-feather';
import {
  Card as MuiCard,
  CardHeader,
  IconButton,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { spacing } from '@mui/system';
import { missingPointSummary } from '../../../../services/inspectionService';


const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);
const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

const DashboardTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const json = await missingPointSummary();
        const sortedData = json.sort((a, b) => b.percentage - a.percentage).slice(0, 5);
        setData(sortedData);
    };

    fetchData();
  }, []);

  return (
    <Card mb={6}>
      <CardHeader
        action={
          <IconButton aria-label="settings" size="large">
            <MoreVertical />
          </IconButton>
        }
        title="Top 5 Common Missing Points"
      />
      <Paper>
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Completion (%)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell>{item.percentage.toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </Paper>
    </Card>
  );
};

export default DashboardTable;
