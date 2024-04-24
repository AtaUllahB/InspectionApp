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
import { spacing } from '@mui/system';
import DashboardLayout from '../../layouts/Dashboard';
import { useRouter } from 'next/router';

import { getInspectionDetailsReport, getReportInfo } from '../../services/inspectionService';


const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Brand = styled(Logo)({
  // If Logo is an SVG file
  width: '100px', // Adjust size as needed
  height: 'auto', // Adjust size as needed
  // margin: '32px auto',
})

function WirRequestPageForm() {
  const router = useRouter();
  const { id } = router.query;
  const [combinedData, setCombinedData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [totalPercentage, settotalPercentage] = useState([]);
  


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

  useEffect(() => {
    const fetchInspection = async () => {
      try {
        const inspectionDetails = await getInspectionDetailsReport(id);
        console.log('Inspection details fetched:', inspectionDetails);
  
        setCombinedData(inspectionDetails);
        settotalPercentage(inspectionDetails.reduce((accumulator, currentItem) => {
          return accumulator + currentItem.percentage;
        }, 0)) ; 
      } catch (error) {
        console.error("Error fetching combined data:", error);
      }
    };
    const fetchReportInfo = async () => {
      try {
        const reportInfo = await getReportInfo(id);
        console.log('Report details fetched:', reportInfo);
  
        setReportData(reportInfo);
        // console.log(reportInfo.contract_number)
        setFormState(prevState => ({
          ...prevState, // This copies the existing state
          contractNumber: reportInfo.contract_number, 
          contractorName: reportInfo.contractor_name,
          dateOfInspection: reportInfo.created_at,
          contractNumber: reportInfo.id,
          location: reportInfo.location,
          projectName: reportInfo.name,
          region: reportInfo.region,
          requestNo: reportInfo.request_no,
        }));
        console.log(formState)
      } catch (error) {
        console.error("Error fetching combined data:", error);
      }
    };
    fetchInspection();
    fetchReportInfo();
  }, []);

  const formRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => formRef.current,
    documentTitle: formState.requestNo,
    onAfterPrint: () => console.log('Print job completed!'),
  });
  

    // Use useCallback to memoize the handler
    const handleInputChange = useCallback((event) => {
      const { name, value, type, checked } = event.target;
      // Logic remains the same
      if (type === 'checkbox') {
        const [category, fieldName] = name.split('.');
        setFormState(prevState => ({
          ...prevState,
          [category]: {
            ...prevState[category],
            [fieldName]: checked,
          },
        }));
      } else {
        setFormState(prevState => ({ ...prevState, [name]: value }));
      }
      console.log(formState)
    }); // Add dependencies if any

  
  const FormToPrint = React.forwardRef((props, ref) => (
    <div ref={ref}>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Work Inspection Request Form</title>
    <style
      dangerouslySetInnerHTML={{
        __html:
          "\n  .input-field { display: inline-block; } body {\n    font-family: 'Arial', sans-serif;\n    padding: 20px;\n   }\n  .container {\n  background: white;\n   color: black;\n   max-width: 1000px;\n    margin: 0 auto;\n     padding: 20px;\n    box-shadow: 0 0 10px rgba(0,0,0,0.1);\n  }\n  .header {\n    text-align: center;\n    margin-bottom: 30px;\n  }\n  .header h1 {\n    margin: 0;\n    font-size: 24px;\n  }\n  .logo {\n    display: block;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 0px;\n  }\n  .signature-line {\n    border-bottom: 1px solid #000;\n    width: 200px; /* or as needed */\n    display: inline-block;\n  }\n  .signature-block {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 10px 0;\n  }\n  .logo img {\n    width: 120px; /* or the size that fits your layout */\n  }\n  table {\n    width: 100%;\n    border-collapse: collapse;\n  }\n  th, td {\n    border: 1px solid #ddd;\n    padding: 8px;\n    text-align: left;\n  }\n  th {\n     width: 25%;\n  }\n  td {\n    width: 25%;\n  }\n  .input-field {\n    width: 100%;\n    padding: 5px;\n    border:none;\n      background: none;\n    color: black;\n      border: none;\n    border-radius: 4px;\n  }\n  tfoot td {\n    background-color: #333;\n    color: #fff;\n    font-weight: bold;\n  }\n"
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
        <tbody>
          <tr>
            <th>Work Inspection Request No.</th>
            <td style={{ width: "33%" }}>
              <input type="text" className="input-field" name="requestNo" defaultValue={formState.requestNo}  /> 
            </td>
            <th>Revision Number &amp; Date</th>
            <td>
              <input type="text" className="input-field" name="revisionNo"  />
            </td>
          </tr>
          <tr>
            <th>Project Name</th>
            <td>
              <input type="text" className="input-field" name="projectName" defaultValue={formState.projectName}  />
            </td>
            <th>Contract Number</th>
            <td>
              <input type="text" className="input-field" name="contract_number" defaultValue={formState.contractNumber} />
            </td>
          </tr>
          <tr>
            <th>Contractor Name</th>
            <td>
              <input type="text" className="input-field" name="contractor_name" defaultValue={formState.contractorName}  />
            </td>
            <th>Region</th>
            <td>
              <input type="text" className="input-field" name="region" defaultValue={formState.region} />
            </td>
          </tr>
          <tr>
            <th>Description of works to be inspected and/or testing</th>
            <td colSpan={3}>
              <textarea
              rows={1}
                className="input-field"
                name="description"
                // style={{ height: 100 }}
                defaultValue={""}
              />
            </td>
          </tr>
          <tr>
            <th>Date of Inspection</th>
            <td>
              <input
                type="date"
                className="input-field"
                name="date_of_inspection"
                
              />
            </td>
            <th>Time of Inspection</th>
            <td>
              <input
                type="time"
                className="input-field"
                name="time_of_inspection"
              />
            </td>
          </tr>
          {/* Repeat for other fields as necessary */}
          <tr>
            <th>Location</th>
            <td colSpan={3}>
              <input type="text" className="input-field" name="location" defaultValue={formState.location} /* onChange={handleInputChange}*/ />
            </td>
          </tr>
          <tr>
            <th>Discipline</th>
            <td colSpan={3} rows={1}>
              <label>
                <input type="checkbox" name="discipline" defaultValue="civil" />{" "}
                Civil
              </label>
              <label>
                <input
                  type="checkbox"
                  name="discipline"
                  defaultValue="architectural"
                />{" "}
                Architectural
              </label>
              <label>
                <input
                  type="checkbox"
                  name="discipline"
                  defaultValue="mechanical"
                />{" "}
                Mechanical
              </label>
              <label>
                <input
                  type="checkbox"
                  name="discipline"
                  defaultValue="electrical"
                />{" "}
                Electrical
              </label>
              <br></br>
              Other:{" "}
              <input
                type="text"
                className="input-field"
                name="discipline_other"
                style={{ width: "70%" }}
              />
            </td>
          </tr>
          <tr>
            <th>Attachment(s)</th>
            <td colSpan={3}>
              <label>
                <input
                  type="checkbox"
                  name="attachments"
                  defaultValue="drawings"
                />{" "}
                Drawings
              </label>
              <label>
                <input
                  type="checkbox"
                  name="attachments"
                  defaultValue="inspection_test_plan"
                />{" "}
                Inspection Test Plan
              </label>
              {/* Add more checkboxes as needed */}
            </td>
          </tr>
          <tr>
            <th>Point of Inspection</th>
            <td colSpan={3}>
              Hold:
              <input
                type="text"
                className="input-field"
                name="point_of_inspection_hold"
                style={{ width: "40%" }}
              />
              Witness:{" "}
              <input
                type="text"
                className="input-field"
                name="point_of_inspection_witness"
                style={{ width: "40%" }}

              />
            </td>
          </tr>
          <tr>
            <th>
              Site Engineer (ready for QA/QC Engineer's inspection and/or testing)
            </th>
            <td colSpan={3}>
              Yes:{" "}
              <input
                type="text"
                className="input-field"
                name="site_engineer_ready_yes"
                style={{ width: "40%" }}

              />
              No:{" "}
              <input
                type="text"
                className="input-field"
                name="site_engineer_ready_no"
                style={{ width: "40%" }}

              />
            </td>
          </tr>
          <tr>
            <th>Signature</th>
            <td>
              <div className="signature-line" />
            </td>
            <th>Date</th>
            <td>
              <input type="date" className="input-field" name="signature_date" />
            </td>
          </tr>
          <tr>
            <th>Time</th>
            <td>
              <input type="time" className="input-field" name="signature_time" />
            </td>
            <td colSpan={2} />{" "}
            {/* Empty cells if needed, or adjust as necessary */}
          </tr>
          {/* ... [Continue with other form fields] ... */}
          {/* ... [Previous HTML elements] ... */}
          <tr>
            <th>QC Engineer Comments</th>
            <td colSpan={3}>
              <textarea
                className="input-field"
                name="qc_engineer_comments"
                rows={1}
                // style={{ width: "100%" }}
                defaultValue={""}
              />
            </td>
          </tr>
          <tr>
            <th>QC Engineer (ready for inspection and/or testing)</th>
            <td colSpan={3}>
              Yes:{" "}
              <input
                type="text"
                className="input-field"
                name="qc_engineer_ready_yes"
                style={{ width: "40%" }}

              />
              No:{" "}
              <input
                type="text"
                className="input-field"
                name="qc_engineer_ready_no"
                style={{ width: "40%" }}

              />
            </td>
          </tr>
          <tr>
            <td colSpan={4} rows={1}>
              <div className="signature-block">
                <div>
                  <label>Signature:</label>
                  <div className="signature-line" />
                </div>
                <div>
                  <label>Date:</label>
                  <input
                    type="date"
                    className="input-field"
                    name="signature_date"
                  />
                </div>
                <div>
                  <label>Time:</label>
                  <input
                    type="time"
                    className="input-field"
                    name="signature_time"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th>QA/QC Manager/Supervisor Name</th>
            <td colSpan={3}>
              <input
                type="text"
                className="input-field"
                name="qa_qc_manager_name"
              />
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
              <div className="signature-block">
                <div>
                  <label>Signature:</label>
                  <div className="signature-line" />
                </div>
                <div>
                  <label>Date:</label>
                  <input
                    type="date"
                    className="input-field"
                    name="manager_signature_date"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th>Client Representative</th>
            <td colSpan={3}>
              <input
                type="text"
                className="input-field"
                name="client_representative"
              />
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
              <div className="signature-block">
                <div>
                  <label>Signature:</label>
                  <div className="signature-line" />
                </div>
                <div>
                  <label>Date:</label>
                  <input
                    type="date"
                    className="input-field"
                    name="representative_signature_date"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th>Remarks</th>
            <td colSpan={3}>
              <textarea
                className="input-field"
                name="remarks"
                rows={1}
                style={{ width: "100%" }}
                defaultValue={""}
              />
            </td>
          </tr>
          {/* ... [Continue with other form fields] ... */}
        </tbody>
      </table>
    </div>
    <div className="container">
      <table>
      <thead style={{ backgroundColor: "#333", color: "#fff",  fontWeight: "bold"}}>
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
          <td>{totalPercentage}%</td>
        </tr>
      </tfoot>
    </table>
    </div>
  </div>
    ));

    FormToPrint.displayName = 'FormToPrint';


  return (
    <React.Fragment>
      <Helmet title="Work Inspection Request (WIR) Form" />
      <Typography variant="h3" gutterBottom display="inline">
      Work Inspection Request (WIR) Form
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NextLink} href="/">
          Dashboard
        </Link>
        <Typography>Work Inspection Request (WIR) Form ID {id}</Typography>
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

WirRequestPageForm.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default WirRequestPageForm;