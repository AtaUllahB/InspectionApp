import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: '#233044', // Dark background color
  color: 'white',
  borderRadius: 0,
}));

const LegendContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: '#233044', // match your table's header background
}));

const LegendItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(2),
}));

const LegendCircle = styled('span')(({ theme, color }) => ({
  display: 'inline-block',
  width: theme.spacing(3), // Increase the size of the circle
  height: theme.spacing(3), // Increase the size of the circle
  borderRadius: '50%',
  backgroundColor: color,
  marginRight: theme.spacing(1),
}));

const LegendText = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontSize: '1rem', // Increase font size
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: '#233044', // Use the same color for all rows
  '&:hover': {
    backgroundColor: '#31465F', // or any other color for hover state
  },
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: 'white', // Text color
  borderBottom: '1px solid #2D3748', // Border color
}));





const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  color: 'white', // Text color for header cells
  backgroundColor: '#1A2027', // Specific background color for header cells
}));

const statusColors = {
  Complete: '#4CAF50', // Green color for pass
  Incomplete: '#F44336', // Red color for incomplete
  Partial:'#ffb74d',
};

const EditButton = styled(IconButton)(({ theme }) => ({
  color: 'white', // Light blue color for edit button
}));


// Assuming this is your data structure
const data = [
  { id: 1, inspectionPoint: 'Skid Painting', qty: 1, status: 'Complete' },
  { id: 2, inspectionPoint: 'Ceiling & Roof', qty: 1, status: 'Complete' },
  { id: 3, inspectionPoint: 'Gypsum Board Installation', qty: 2, status: 'Complete' },
  { id: 4, inspectionPoint: 'Heater', qty: 1, status: 'Complete' },
  { id: 5, inspectionPoint: 'Door Cutting for Lock System', qty: 2, status: 'Complete' },
  { id: 6, inspectionPoint: 'Plumbing Fixture for Toilet', qty: 1, status: 'Complete' },
  { id: 7, inspectionPoint: 'Sprinkler Installation', qty: 1, status: 'Complete' },
  { id: 8, inspectionPoint: 'Toilet Accessories', qty: 1, status: 'Complete' },
  { id: 9, inspectionPoint: 'Internal & External Door Installation', qty: 1, status: 'Complete' },
  { id: 10, inspectionPoint: 'Kitchen Cabniet', qty: 1, status: 'Complete' },
  { id: 11, inspectionPoint: 'Window Installation', qty: 3, status: 'Complete' },
  { id: 12, inspectionPoint: 'Internal & External Painting', qty: 1, status: 'Complete' },
];

const StyledStatusTypography = styled(Typography)(({ theme, statuscolor }) => ({
  fontWeight: 'bold',
  color: statuscolor, // Use the color from props
}));
 
const StatusTypography = styled(Typography)(({ statusColor }) => ({
  fontWeight: 'bold',
  color: statusColor === 'Incomplete' ? '#F44336' : statusColor === 'Partial' ? '#ffb74d' : '#4CAF50',
  backgroundColor: statusColor === 'Incomplete' ? '#F4433622' : statusColor === 'Partial' ? '#ffb74d22' : '#4CAF5022',
  padding: '3px 10px', // Add padding for highlight effect
  borderRadius: '4px', // Round the corners for highlight effect
}));
function TableLegend() {
  return (
    <LegendContainer>
      <LegendItem>
        <LegendCircle color="#4CAF50" />
        <LegendText>Complete</LegendText>
      </LegendItem>
      <LegendItem>
        <LegendCircle color="#F44336" />
        <LegendText>Incomplete</LegendText>
      </LegendItem>
      <LegendItem>
        <LegendCircle color="#ffb74d" />
        <LegendText>Partial</LegendText>
      </LegendItem>
    </LegendContainer>
  );
}

function CustomizedTables() {
  // Initialize useRouter
  const router = useRouter();

  // Function to handle edit button click, it receives the id of the row to edit
  const handleEditClick = (id, status) => {
    router.push({
      pathname: '/pages/completeform',
      query: { id: id, status: status }, // Passing ID and initial status to the CompleteForm page
    });
  };
  // TableLegend component remains unchanged

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', background: '#1A2027' }}>
      <TableLegend />
      <StyledTableContainer>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Inspection Points</StyledTableCell>
              <StyledTableCell align="center">Qty</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.inspectionPoint}
                </StyledTableCell>
                <StyledTableCell align="center">{row.qty}</StyledTableCell>
                <StyledTableCell align="center">
                  <StyledStatusTypography statuscolor={statusColors[row.status]}>
                    {row.status}
                  </StyledStatusTypography>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.status === 'Partial' || row.status === 'Incomplete' ? (
                    <EditButton aria-label="edit" onClick={() => handleEditClick(row.id, row.status)}>
                      <EditIcon />
                    </EditButton>
                  ) : (
                    // Optionally render a disabled button or nothing at all
                    <Typography>-</Typography>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Paper>
  );
}

export default CustomizedTables;