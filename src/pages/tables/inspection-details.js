import React, { useState, useEffect, useRef, useCallback } from 'react';

import styled from '@emotion/styled';
import NextLink from 'next/link';
import { useReactToPrint } from 'react-to-print';
import Logo from '../../vendor/logo.svg'


import { Helmet } from 'react-helmet-async';
import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card,
  CardContent ,
  Divider ,
  Paper ,
  Typography,
  Button,
  Box,
  CircularProgress,
  CssBaseline,
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Grid,
  CardMedia
  
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { getCustomers, updateCustomer, deleteCustomer , createCustomer } from '../../services/customerService'; // Adjust path as necessary
import { spacing } from '@mui/system';
import DashboardLayout from '../../layouts/Dashboard';
import { useRouter } from 'next/router';
import { getInspectionDetailsStructured } from '../../services/inspectionService';


const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Brand = styled(Logo)({
  // If Logo is an SVG file
  width: '100px', // Adjust size as needed
  height: 'auto', // Adjust size as needed
  // margin: '32px auto',
})

function WirRequestPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', is_active: true }); // Adjust according to your customer model
  const router = useRouter();
  const [editRowsModel, setEditRowsModel] = useState({});
  const [combinedData, setCombinedData] = useState([]);

  const { id } = router.query;


  const [formState, setFormState] = useState({
    requestNo: '',
    revisionNo: '',
    projectName: '',
    contractNumber: '',
    contractorName: '',
    region: '',
    descriptionOfWorks: '',
    dateOfInspection: '',
    timeOfInspection: '',
    location: '',
    disciplineCivil: false,
    disciplineArchitectural: false,
    disciplineMechanical: false,
    disciplineElectrical: false,
    disciplineOther: '',
    attachmentsDrawings: false,
    attachmentsInspectionTestPlan: false,
    pointOfInspectionHold: '',
    pointOfInspectionWitness: '',
    siteEngineerReadyYes: '',
    siteEngineerReadyNo: '',
    signatureDate: '',
    signatureTime: '',
    qcEngineerComments: '',
    qcEngineerReadyYes: '',
    qcEngineerReadyNo: '',
    qaQcManagerName: '',
    clientRepresentative: '',
    remarks: '',
    // Add additional state properties as needed for all form fields
  });

  const formRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => formRef.current,
    documentTitle: 'WIR-Form',
    onAfterPrint: () => console.log('Print job completed!'),
  });

  const [inspections, setInspections] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchInspectionDetails = async () => {
        setLoading(true);
        try {
          const data = await getInspectionDetailsStructured(id);
          console.log(data)
          setInspections(Array.isArray(data) ? data : [data]);
        } catch (error) {
          console.error('Error fetching inspection details:', error);
          setError('Failed to load inspection details. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchInspectionDetails();
    }
  }, [id]);

  const renderImage = (imgAddr) => {
    const defaultImage = '/image.png'; // Ensure you have a default image in your public folder
    const imageUrl = imgAddr ? `${process.env.NEXT_PUBLIC_API_URL}${imgAddr}` : defaultImage;
    return (
      <CardMedia
        component="img"
        image={imageUrl}
        alt="Inspection Detail"
        sx={{ width: 'auto', height: 140, margin: 'auto' }}
        onError={(e) => { e.target.onerror = null; e.target.src = defaultImage; }} // Fallback to default image on error
      />
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error" textAlign="center">{error}</Typography>;
  }
  
  



  return (
    <React.Fragment>
      {/* <Helmet title="Inspection Details" /> */}
      <Typography variant="h3" gutterBottom display="inline">
      Inspection Details fot {id}
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NextLink} href="/">
          Dashboard
        </Link>
        <Typography>Inspection Details for {id}</Typography>
      </Breadcrumbs>
      {/* <Typography variant="h3">Inspection Details for ID: {id}</Typography> */}
      <CssBaseline />
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, overflowY: 'auto' }}>
        {inspections.map((inspection) => (
          <Accordion key={inspection.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <table style={{ width: '100%'}}>
      <tbody>
        <tr style={{ padding: '8px' }} key={inspection.id} >
          <td style={{ width: '50%', borderCollapse: 'collapse' }}><Typography variant="h6">{inspection.name}</Typography></td>
          <td style={{ width: '25%', borderCollapse: 'collapse' }}><Typography variant="h6">Percentage: {inspection.percentage}%</Typography></td>
          {inspection.inspectionDetails ?<td style={{ width: '25%', borderCollapse: 'collapse' }}><Typography variant="h6">Inspection Points: {inspection.inspectionDetails.length}</Typography></td> : null }
          
          {/* <td>{row.inputs_count}</td> */}
          {/* <td>{row.status}</td> */}
        </tr>
        {/* More rows here */}
      </tbody>
    </table>
              {/* <Typography variant="h6">Inspection Name: {inspection.name} | Completion: {inspection.percentage}%</Typography> */}
              {/* <Typography variant="h6">{inspection .percentage}</Typography> */}
              {/* <Typography variant="h6">{inspection.status}</Typography> */}

            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                { inspection.inspectionDetails ? inspection.inspectionDetails.map((detail) => (
                  <Grid item xs={12} sm={6} md={4} key={detail.id}>
                    <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <CardContent>
                        <Typography variant="body1" component="div">
                          Inspection Point ID: {detail.inspectionpoint_id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Name: {detail.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Status: {detail.status}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Created At: {new Date(detail.created_at).toLocaleString()}
                        </Typography>
                        {/* Add more details as needed */}
                      </CardContent>
                      {renderImage(detail.img_addr)}
                    </Card>
                  </Grid>
                )) :  <Typography color="error" textAlign="center">No details found.</Typography>      }
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
          <Button variant="contained" onClick={() => router.back()}>
            Back
          </Button>
        </Box>
      </Box>
     

     
    </React.Fragment>
  );
}

WirRequestPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default WirRequestPage;