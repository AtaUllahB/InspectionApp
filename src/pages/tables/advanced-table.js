import React, { useState, useEffect } from 'react';
import { useQualityPoints } from '../../contexts/QualityPointsContext';
import { getInspectionDetails } from '../../services/inspectionService';
// import { Box, Typography, Grid, Card, CardContent, CardMedia,Button,  CssBaseline } from '@mui/material';
import { useRouter } from 'next/router';
import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  IconButton,
  Button,
  CardMedia
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const CustomizedTables = () => {
  const router = useRouter();
  const [combinedData, setCombinedData] = useState([]);
  const { qualityPoints, loading: qualityPointsLoading } = useQualityPoints();
  const handleEditClick = (inspectionpoint_id, status, name, img_addr) => {
    router.push({
      pathname: '/pages/completeform',
      query: { id: inspectionpoint_id, status: status, name:name, img_addr:img_addr }, // Passing ID and initial status to the CompleteForm page
    });
    console.log('query',inspectionpoint_id);
  };
useEffect(() => {
    const storedInspectionId = localStorage.getItem('geninspectionId');
    if (storedInspectionId ) {
      fetchData(storedInspectionId);
    }
},[]);

  const fetchData = async (inspectionId) => {
    try {
      console.log('Fetching data for inspectionId:', inspectionId);
      const inspectionDetails = await getInspectionDetails(inspectionId);
      console.log('Inspection details fetched:', inspectionDetails);

      // const combinedData = inspectionDetails.map(detail => {
      //   const qualityPoint = qualityPoints.find(ip => ip.label === detail.inspectionpoint_id);
      //   console.log('Matching quality point:', qualityPoint);
      //   return {
      //     ...detail,
      //     inspectionPointName: detail ? detail.name : "Unknown",
      //     quantity: detail.count || "1",
      //   };
      // });

      // console.log('Combined data:', combinedData);
      setCombinedData(inspectionDetails);
    } catch (error) {
      console.error("Error fetching combined data:", error);
    }
  };
  const renderImage = (imgAddr) => {
    const defaultImage = '/image.png';
    const imageUrl = imgAddr ? `${process.env.NEXT_PUBLIC_API_URL}${imgAddr}` : defaultImage;
    return (
      <CardMedia
        component="img"
        image={imageUrl}
        alt="Inspection Detail"
        sx={{ width: 'auto', height: 50, margin: 'auto' }}
      />
    );
  };
  
  const statusCounts = combinedData.reduce((acc, { status }) => {
    if (status === 'inComplete') acc.incompleteCount++;
    else if (status === 'Partial') acc.partialCount++;
    else if (status === 'Complete') acc.passCount++;
    return acc;
  }, { incompleteCount: 0, partialCount: 0, passCount: 0 });

  // if (qualityPointsLoading) {
  //   console.log("loading")
  //   return <div>Loading...</div>;
  // }

  return (
    <>
     
     <TableContainer component={Paper} sx={{ maxWidth: '100%' }}>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', mb: 4, mt: 2 }}>

        {/* <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
          Scanning Report Summary
        </Typography>
      
        <Typography variant="body1" sx={{ color: 'white', mb: 3 }}>
          All 12 points have been scanned successfully
        </Typography> */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
            <Box sx={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: 'error.main', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '8px' }}>
              {statusCounts.incompleteCount}
            </Box>
            <Typography>Incomplete</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginX: '16px' }}>
            <Box sx={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: 'warning.main', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '8px' }}>
              {statusCounts.partialCount}
            </Box>
            <Typography>Partial</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '16px' }}>
            <Box sx={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: 'success.main', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '8px' }}>
              {statusCounts.passCount}
            </Box>
            <Typography>Complete</Typography>
          </Box>
        </Box>
        
      </Box>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Inspection Points</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {combinedData.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                 {renderImage(row.img_addr)}
                  {/* <image src={  row.img_addr ? `${process.env.NEXT_PUBLIC_API_URL}${row.img_addr}` : '/image.png' }></image> */}
                </TableCell>
                <TableCell align="center">
                  {row.count}
                  
                </TableCell>
                <TableCell align="center">
                  <Typography
                    sx={{
                      color: row.status === 'Complete' ? 'green' :
                             row.status === 'inComplete' ? 'red' : 
                             row.status === 'Partial' ? 'orange' : 'red'
                    }}
                  >
                    {row.status}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  
                  <IconButton aria-label="edit" onClick={() => handleEditClick(row.id, row.status, row.name, row.img_addr)}>
                  <EditIcon fontSize="inherit" />
    </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomizedTables;
