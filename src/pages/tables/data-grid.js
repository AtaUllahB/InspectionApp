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
  Modal, Box
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { spacing } from '@mui/system';
import DashboardLayout from '../../layouts/Dashboard';
import { getUsers, updateUser, deleteUser } from '../../services/userService';
import { useRouter } from 'next/router'; // Import useRouter
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import IconButton from '@mui/material/IconButton';
import SignUp from '../../components/auth/SignUp'
const Card = styled(MuiCard)(spacing);
const CardContent = styled(MuiCardContent)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
const PaperStyled = styled( MuiPaper)({
  height: 400,
  width: '100%',
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto', // Adjust width as necessary
  maxWidth: '600px', // Set a max-width to maintain the square shape
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px' // Optional, for rounded corners
};


function DataGridDemo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRow, setEditingRow] = useState(null);
  const router = useRouter();
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const toggleShowPasswords = () => {
    setShowPasswords(!showPasswords);
  };
  // Function to open the SignUp modal
  const handleOpenSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  // Function to close the SignUp modal
  const handleCloseSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  const handleCreateInspector = () => {
    router.push('/SignUp'); 
  };
  const handleEditClick = (id) => {
    setEditingRow(id);
  };
// ... other states remain unchanged ...
const [openModal, setOpenModal] = useState(false);

// Function to open the modal
const handleOpenModal = () => {
  setOpenModal(true);
};

// Function to close the modal
const handleCloseModal = () => {
  setOpenModal(false);
};
  const processRowUpdate = async (newRow) => {
    try {
      await updateUser(newRow.id, newRow);
      setEditingRow(null); // Exit edit mode
      return newRow;
    } catch (error) {
      console.error('Error updating user:', error);
      return editingRow; // Revert to the old row on error
    } finally {
      fetchUsers(); // Refresh data after update
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

 

  const fetchUsers = async () => {
    setLoading(true);
    try {
      let data = await getUsers();
      // Filter users to include only those with the role 'inspector'
      data = data.filter(user => user.role === 'inspector');
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };
  
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        fetchUsers(); // Refresh data after delete
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

 
  const handleRowEditCommit = async (params) => {
    try {
      const updatedRow = { ...params.row };
      await updateUser(params.id, updatedRow);
      fetchUsers(); // Refresh data after update
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle error (e.g., show a notification)
    }
  };


  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
    {
      field: 'password',
      headerName: 'Pin',
      width: 150, // Adjusted width to accommodate icon
      editable: true,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {showPasswords ? params.value : '●●●●'}
          <IconButton onClick={toggleShowPasswords} size="small">
            {showPasswords ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
          </IconButton>
        </div>
      ),
    },
    { field: 'created_at', headerName: 'Created At', width: 150 },
    { field: 'updated_at', headerName: 'Updated At', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <React.Fragment>
          {editingRow === params.id ? (
            <Button color="primary" onClick={() => setEditingRow(null)}>
              Cancel
            </Button>
          ) : (
            <Button color="primary" onClick={() => handleEditClick(params.id)}>
              Edit
            </Button>
          )}
          <Button color="error" onClick={() => handleDelete(params.id)}>
            Delete
          </Button> 
        </React.Fragment>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
  <Box sx={{ position: 'absolute', top: -58, right: 16, zIndex: 1000 }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          
          onClick={handleOpenSignUpModal}
        >
          Add Inspector
        </Button>
      </Box>

      {/* SignUp Modal */}
      <Modal
        open={isSignUpModalOpen}
        onClose={handleCloseSignUpModal}
        aria-labelledby="signup-modal-title"
      >
        <Box sx={{
          ...modalStyle,
          width: 300, // Adjust width to make it square
          height: 'auto', // Adjust height based on content
          overflow: 'auto',
         
        }}>
          <Typography id="signup-modal-title" variant="h6" component="h2">
            Register Cabin Inspector
          </Typography>
          {/* Only the SignUp form will be rendered inside the modal */}
          <SignUp onCloseModal={handleCloseSignUpModal} />
        </Box>
      </Modal>
      <PaperStyled>
      <DataGrid
        rows={users}
        columns={columns}
        loading={loading}
        processRowUpdate={processRowUpdate}
      editMode="row"
      editingRow={editingRow}
        onRowEditCommit={handleRowEditCommit}
      
        experimentalFeatures={{ newEditingApi: true }}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 25]}
        checkboxSelection
      />
    </PaperStyled>
    </Box>
  );
}

function DataGridPage() {
  return (
    <React.Fragment>
      <Helmet title="Inspectors" />
      <Typography variant="h3" gutterBottom display="inline">
        Inspectors
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NextLink} href="/">
          Dashboard
        </Link>
        {/* <Link component={NextLink} href="/">
          Tables
        </Link> */}
        <Typography>Inspectors</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <DataGridDemo />
    </React.Fragment>
  );
}

DataGridPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DataGridPage;
