import React, { useState, useEffect, useRef, useCallback } from 'react';

import styled from '@emotion/styled';
import NextLink from 'next/link';
import { useReactToPrint } from 'react-to-print';
import Logo from '../../vendor/logo.svg'


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
  Box 
  
} from '@mui/material';
import { getCustomers, updateCustomer, deleteCustomer , createCustomer } from '../../services/customerService'; // Adjust path as necessary
import { spacing } from '@mui/system';
import DashboardLayout from '../../layouts/Dashboard';
import { useRouter } from 'next/router';
import { getInspectionDetailsReport } from '../../services/inspectionService';


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
  
  useEffect(() => {
    const fetchInspection = async () => {
      try {
        const inspectionDetails = await getInspectionDetailsReport(id);
        console.log('Inspection details fetched:', inspectionDetails);
  
        setCombinedData(inspectionDetails);
      } catch (error) {
        console.error("Error fetching combined data:", error);
      }
    };
    fetchInspection()
  });




  const FormToPrint = React.forwardRef((props, ref) => (
    <div ref={ref}>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Work Inspection Request Form</title>
    <style
    dangerouslySetInnerHTML={{
      __html:
        "\n  .header{margin-bottom: 0px;\n} body {\n    font-family: 'Arial', sans-serif;\n    font-size: 14px;\n    margin: 0;\n    padding: 20px;\n    background: #f7f7f7;\n  }\n  .container {\n   color:black;\n max-width: 1000px;\n    margin: 0 auto;\n    background: #fff;\n    padding: 20px;\n  }\n  h1 {\n    color: #333;\n    text-align: center;\n  }\n  table {\n    width: 100%;\n    border-collapse: collapse;\n    margin-top: 20px;\n  }\n  th, td {\n    border: 1px solid #ddd;\n    padding: 8px;\n    text-align: left;\n  }\n  th {\n    background-color: #f2f2f2;\n  }\n  tfoot td {\n    background-color: #333;\n    color: #fff;\n    font-weight: bold;\n  }\n"
    }}
  />
    <div className="container">
      <div className="header">
        <h1>Work Inspection Request (WIR) Form</h1>
      </div>
      <div className="logo">
      <Brand />
      </div>
      <table>
      <thead>
        <tr>
          <th>% of Work completion Modular units at Factory</th>
          <th>Work Completion % Weightage</th>
          <th>No. of Inputs</th>
          <th>Status of Inspection</th>
        </tr>
      </thead>
      <tbody>
      {combinedData.map((row, index) => (
        <tr key={row.id}>
          <td>{row.name}</td>
          <td>{row.percentage}%</td>
          <td>{row.inputs_count}</td>
          <td>{row.status}</td>
        </tr>
        ))}
        {/* More rows here */}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3}>Overall % Completion</td>
          <td>80%</td>
        </tr>
      </tfoot>
    </table>
    </div>
  </div>
    ));
    FormToPrint.displayName = 'FormToPrint';


  return (
    <React.Fragment>
      <Helmet title="Customers" />
      <Typography variant="h3" gutterBottom display="inline">
        WIR Request
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NextLink} href="/">
          Dashboard
        </Link>
        <Typography>Wir Request Form</Typography>
      </Breadcrumbs>
      {/* Your form rendered for printing */}
      <FormToPrint ref={formRef} />

      {/* Button to trigger print */}
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Button variant="contained" color="primary" onClick={handlePrint}>
          Save Form as PDF
        </Button>
      </Box>
    </React.Fragment>
  );
}

WirRequestPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default WirRequestPage;