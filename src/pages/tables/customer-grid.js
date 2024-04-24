import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import NextLink from 'next/link';

import { Helmet } from 'react-helmet-async';
import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Typography,
  Button,
  Modal, Box, Grid, TextField
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getCustomers, updateCustomer, deleteCustomer , createCustomer } from '../../services/customerService'; // Adjust path as necessary
import { spacing } from '@mui/system';
import DashboardLayout from '../../layouts/Dashboard';
import { useRouter } from 'next/router';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import IconButton from '@mui/material/IconButton';

const Card = styled(MuiCard)(spacing);
const CardContent = styled(MuiCardContent)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
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
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px'
};

function CustomerDataGridPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', is_active: true }); // Adjust according to your customer model
  const router = useRouter();
  const [editRowsModel, setEditRowsModel] = useState({});
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const data = await getCustomers();
        setCustomers(data);
        console.log(customers)
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteCustomer(id);
        setCustomers(customers.filter(customer => customer.id !== id)); // Optimistic update
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 , editable: true},
    { field: 'region', headerName: 'Region', width: 150 , editable: true},
    { field: 'location', headerName: 'Location', width: 150 , editable: true},
    { field: 'contractor_name', headerName: 'Contractor Name', width: 150 , editable: true},
    { field: 'contract_number', headerName: 'Contract Number', width: 150 , editable: true},


    {
      field: 'is_active',
      headerName: 'Active',
      width: 110,
      renderCell: (params) => params.value ? 'Yes' : 'No', editable: true,
    },
    { field: 'created_at', headerName: 'Created At', width: 150 },
    { field: 'updated_at', headerName: 'Updated At', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
 
        <React.Fragment>
          <Button color="primary" size="small" onClick={() => handleEditClick(params.id)}>Edit</Button>
          <Button color="error" size="small" onClick={() => handleDelete(params.id)}>Delete</Button>
        </React.Fragment>
     
      ),
    },
  ];
  const handleProcessRowUpdate = async (newRow) => {
    try {
      // Call your update service here
      await updateCustomer(newRow.id, newRow);
      // Return the updated row to update the grid state
      return newRow;
    } catch (error) {
      console.error('Error updating customer:', error);
      // Return the original row to revert the changes in the grid
      return params.row;
    }
  };
  
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewCustomer(prev => ({ ...prev, [name]: value }));
  };
  const handleEditClick = (id) => {
    setEditRowsModel({ [id]: { _isRowEditable: true } });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const savedCustomer = await createCustomer(newCustomer);
      setCustomers([...customers, savedCustomer]); // Optimistically add the new customer to the UI
      handleCloseModal();
      setNewCustomer({ name: '', is_active: true }); // Reset form
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };
  return (
    <React.Fragment>
      <Helmet title="Customers" />
      <Typography variant="h3" gutterBottom display="inline">
        Customers
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NextLink} href="/">
          Dashboard
        </Link>
        <Typography>Customers</Typography>
      </Breadcrumbs>

      <Divider my={6} />
      <Box sx={{ position: 'absolute', top: 150, right: 36, zIndex: 1000 }}>
      <Button variant="contained" onClick={handleOpenModal} sx={{ mb: 2 }}>
        Add New Customer
      </Button>
      </Box>
      <Box sx={{ height: 400, width: '100%' }}>
        <PaperStyled>
          <DataGrid
            rows={customers}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            loading={loading}
            editRowsModel={editRowsModel}
            onEditRowsModelChange={setEditRowsModel}
            // other necessary props...
          />
        </PaperStyled>
      </Box>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="create-customer-modal-title"
        aria-describedby="create-customer-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="create-customer-modal-title" variant="h6" marginBottom={2}>
            Add New Customer
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={newCustomer.name}
              onChange={handleChange}
              autoFocus
            />
            {/* Include other fields as necessary */}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Save Customer
            </Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

CustomerDataGridPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CustomerDataGridPage;