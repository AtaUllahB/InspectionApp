import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import NextLink from 'next/link';
import { Helmet } from 'react-helmet-async';
import { FiMail } from 'react-icons/fi'; 

import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Typography,
  Box,
  Button,
  TextField
} from '@mui/material';
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
import { DataGrid } from '@mui/x-data-grid';
import { spacing } from '@mui/system';
import DashboardLayout from '../../layouts/Dashboard';
import { getinspections } from '../../services/inspectionService'; // Ensure this is the correct import path
import { useRouter } from 'next/router';

import SignUp from '../../components/auth/SignUp';
const Card = styled(MuiCard)(spacing);
const CardContent = styled(MuiCardContent)(spacing);
const Divider = styled(MuiDivider)(spacing);


// Styled components
const PaperStyled = styled(MuiPaper)({
  height: 400,
  width: '100%',
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  maxWidth: '600px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px'
};

function InspectionDataGridPage() {

  const router = useRouter();


  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInspections = inspections.filter((inspection) => {
    // Parsing inspection approved_datetime to Date object
    const inspectionDate = new Date(inspection.created_at);
  
    // fromDate and toDate conditions adjusted for day comparison
    const fromDateCondition = fromDate ? inspectionDate >= new Date(fromDate + "T00:00:00") : true;
    const toDateCondition = toDate ? inspectionDate <= new Date(toDate + "T23:59:59") : true;
  
    // Search condition focused on cabin_id
    const searchCondition = searchQuery ? inspection.cabin_id.toLowerCase().includes(searchQuery.toLowerCase()) : true;
  
    return fromDateCondition && toDateCondition && searchCondition;
  });
  
    
  useEffect(() => {
    const fetchInspections = async () => {
      setLoading(true);
      try {
        let data = await getinspections();
        console.log(data)
        setInspections(Array.isArray(data) ? data : [data]);
        
      } catch (error) {
        console.error('Error fetching inspections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInspections();
  }, []);
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'cabin_id', headerName: 'Cabin ID', width: 90 },
    { field: 'unit_type', headerName: 'Unit Type', width: 90 },
    // { field: 'customer_id', headerName: 'Customer', width: 90 },
    // { field: 'submitted', headerName: 'Submitted', width: 90, type: 'boolean' },
    {
      field: 'customer_id', // This might still be required for identification
      headerName: 'Customer',
      width: 150,
      renderCell: (params) => params.row.customer?.name || 'N/A', // Custom renderer to display the customer's name
  },
    { field: 'approved', headerName: 'Approved', width: 90, type: 'boolean' },
    { field: 'percentage', headerName: 'Percentage', width: 90, type: 'number' },
    
    {
      field: 'approved_datetime',
      headerName: 'Approved Datetime',
      width: 180,
      type: 'dateTime',
      valueGetter: (params) => params.value ? new Date(params.value) : null,
    },
    {
      field: 'created_at',
      headerName: 'Creation Datetime',
      width: 180,
      type: 'dateTime',
      valueGetter: (params) => params.value ? new Date(params.value) : null,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 150,
      renderCell: (params) => {
        const onClick = () => {
          // Use the ID from params.id to navigate to a dynamic route
          // router.push(`/tables/inspection-details/${params.id}`);
          router.push({
            pathname: '/tables/inspection-details',
            query: { id: params.id }, // Passing ID and initial status to the CompleteForm page
          });
        };
    
        return <Button onClick={onClick}>Show Details</Button>;
      },
    },
    {
      field: 'WIR Form',
      headerName: 'WIR Form',
      sortable: false,
      width: 150,
      renderCell: (params) => {
        const onClick = () => {
          // Use the ID from params.id to navigate to a dynamic route
          // router.push(`/tables/wir_page_request_form/${params.id}`);
          // router.push(`/tables/wir_page_request_form`);
          router.push({
            pathname: '/tables/wir_page_request_form',
            query: { id: params.id }, // Passing ID and initial status to the CompleteForm page
          });

        };
    
        return <Button onClick={onClick}> <FiMail /></Button>;
      },
    }
    ,
    // {
    //   field: 'WIR',
    //   headerName: 'WIR',
    //   sortable: false,
    //   width: 150,
    //   renderCell: (params) => {
    //     const onClick = () => {
    //       // Use the ID from params.id to navigate to a dynamic route
    //       // router.push(`/tables/wir_page_request/${params.id}`);
    //       router.push({
    //         pathname: '/tables/wir_page_request',
    //         query: { id: params.id }, // Passing ID and initial status to the CompleteForm page
    //       });
    //     };
    
    //     return <Button onClick={onClick}> <FiMail /></Button>;
    //   },
    // }
    // Add more fields or actions as needed
  ];

  return (
    <React.Fragment>
      <Helmet title="Inspections" />
      
      <Box sx={{ mb: 2 }}>
     
  <TextField
    label="From Date"
    type="date"
    value={fromDate || ''}
    onChange={(e) => setFromDate(e.target.value)}
    InputLabelProps={{ shrink: true }}
  />
  <TextField
    label="To Date"
    type="date"
    value={toDate || ''}
    onChange={(e) => setToDate(e.target.value)}
    InputLabelProps={{ shrink: true }}
    sx={{ ml: 2 }}
  />
  <TextField
    label="Search by Cabin ID"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    sx={{ ml: 2 }}
  />
</Box>


      <Divider my={6} />

      <Box sx={{ width: '100%', position: 'relative' }}>
        <PaperStyled>
        <DataGrid
  rows={filteredInspections}
  columns={columns}
  loading={loading}
  pageSize={5}
  rowsPerPageOptions={[5, 10, 25]}
  checkboxSelection
/>

        </PaperStyled>
      </Box>
    </React.Fragment>
  );
}

InspectionDataGridPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default InspectionDataGridPage;
