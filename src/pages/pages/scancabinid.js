import React, { useState, useEffect, useContext, useRef } from 'react'; // Updated import
import { Button, AppBar, Toolbar, Box, Grid, Typography ,TextField, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import Tesseract from 'tesseract.js';

import styled from '@emotion/styled';

import Navbar from '../components/CommonNavbar'
import { useCabin } from '../../contexts/CabinContext'; // Adjust the path as necessary
import { submitCabinId } from '../../services/cabinidService';
import { getcustomers } from '../../services/userService';
import { fetchQualityPointsByUnitType } from '../../services/cabinidService'; // Adjust import path as necessary
import { getinspections } from '../../services/inspectionService'; 
import { useInspectionId } from '../../contexts/InspectionIdContext';
import { InspectionIdContext } from '../../contexts/InspectionIdContext'; // Adjust the path to where your context is exported

const CabinComponent = () => {
 
  const router = useRouter();

  const { currentInspectionId, updateInspectionId } = useContext(InspectionIdContext);
  console.log(`Received inspectionId from context: ${currentInspectionId}`);
  const { cabinId, setCabinId } = useCabin();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  const [captureImage, setCaptureImage] = useState('');
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 });
  const [localCabinId, setLocalCabinId] = useState(''); 
  const [openPopup, setOpenPopup] = useState(false); // State for managing popup visibility
  const [unitType, setUnitType] = useState(''); // State for selected unit type
  const [customer, setCustomer] = useState(''); // State for selected customer
  const [qualityPoints, setQualityPoints] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cabinIdError, setCabinIdError] = useState('');
  const StyledRecord = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.common.white, // Set text color to white
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    boxShadow: theme.shadows[1],
    marginBottom: theme.spacing(2),
    '&:last-child': {
      marginBottom: 0,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover, // Or any other hover color
    },
    '.MuiTypography-root': { // This targets all Typography components within StyledRecord
      wordBreak: 'break-all', // This will break lines at any character to prevent overflow
      overflowWrap: 'break-word', // Allows unbreakable words to be broken
    },
  }));
  useEffect(() => {
    if (unitType === 'Residence') { // Assuming 'Type1' is the value for "Residence"
      fetchQualityPointsByUnitType('Residence')
        .then(data => {
          setQualityPoints(data); // Assuming 'data' is the array of quality points
        })
        .catch(error => console.error('Failed to fetch quality points:', error));
    } else if (unitType === 'Others') { // Assuming 'Type2' is the value for "Other"
      fetchQualityPointsByUnitType('Others')
        .then(data => {
          setQualityPoints(data);
        })
        .catch(error => console.error('Failed to fetch quality points:', error));
    }
  }, [unitType]);
  
  const fetchInspections = async () => {
    setLoading(true);
    try {
      let data = await getinspections();
      setInspections(Array.isArray(data) ? data : [data]); // Remove the slice method
    } catch (error) {
      console.error('Error fetching inspections:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchInspections();
  }, []);

  useEffect(() => {
    // Fetch customers when the component mounts
    const fetchCustomers = async () => {
      try {
        const fetchedCustomers = await getcustomers();
        setCustomers(fetchedCustomers);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    openCamera();
    return () => {
      document.body.style.overflow = '';
      stopCameraStream(); // This should correctly stop the camera
    };
  }, []);

  useEffect(() => {
    const queryCabinId = router.query.cabinId;
    if (queryCabinId) {
      setCabinId(queryCabinId); // Update context
      setLocalCabinId(queryCabinId); // Update local state
    }
  }, [router.query.cabinId, setCabinId]);
  useEffect(() => {
    drawOverlay();
    window.addEventListener('resize', drawOverlay);
    return () => window.removeEventListener('resize', drawOverlay);
  }, [stream]); // Ensure the overlay is redrawn if the stream or window size changes
  useEffect(() => {
    const updateVideoDimensions = () => {
      if (videoRef.current) {
        const { width, height } = videoRef.current.getBoundingClientRect();
        setVideoDimensions({ width, height });
      }
    };
  
    // Update dimensions immediately if stream is already loaded
    if (stream) {
      updateVideoDimensions();
    }
  
    window.addEventListener('resize', updateVideoDimensions);
    return () => window.removeEventListener('resize', updateVideoDimensions);
  }, [stream]); // Depend on stream to re-calculate when it changes
  const openCamera = () => {
    const constraints = { video: { facingMode: "environment" } };
    navigator.mediaDevices.getUserMedia(constraints)
      .then(currentStream => {
        setStream(currentStream);
        if (videoRef.current) videoRef.current.srcObject = currentStream;
      })
      .catch(error => console.error("Error accessing the camera: ", error));
  };

  const stopCameraStream = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };
  const handleRowClick = (inspectionId) => {
    router.push(`/pages/reporttable`); // Replace with your specific route
    updateInspectionId(inspectionId);
    let d= localStorage.setItem('geninspectionId', inspectionId); 
    console.log('updateInspectionId',updateInspectionId)
    console.log('localStorage',d)
  };
  const handleSubmit = async () => {
    console.log(cabinId);
    if (!cabinId.trim()) {
      setCabinIdError('Please submit a valid Cabin ID.'); // Set error message
      return; // Stop the submission process
    } else {
      setCabinIdError(''); // Clear any existing error message
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
      // Open the popup without submitting to the database
      setOpenPopup(true);
    }
  };
  
  const handleClose = () => {
    setOpenPopup(false);
  };
  
  const handlePopupSubmit = async () => {
    setOpenPopup(false); // Close the popup first to prevent multiple submissions
  

    try {
      // Replace `submitCabinDetails` with the actual function you use to submit the details
     // const response = await submitCabinDetails(cabinId, unitType, customer);
     const data = await submitCabinId(cabinId, unitType,customer); // Use the service to submit the cabin ID
      console.log('Submission successful', data); 
     const response = data;
      console.log('Additional details submission successful', response);
      
      console.log('Submission successful', data);
      updateInspectionId(data.id); // Assuming submissionResult contains the new inspection ID
      console.log(`Received inspectionId from context: ${currentInspectionId}`);
      localStorage.setItem('geninspectionId', data.id); // Save to localStorage
      console.log('Saved inspectionId from context: ' + localStorage.getItem('geninspectionId'));
      localStorage.setItem('qualityPoints', JSON.stringify(qualityPoints));
      // After successful submission, proceed with navigation
      console.log('Navigating to /inspectordashboard/inspectordashboard');
      const navigationResult = await router.push({
        pathname: '/inspectordashboard/inspectordashboard',
        query: {
          cabinId,
          unitType: unitType ,
        },
      });
      
      // Log the result of the navigation attempt
      console.log('Navigation result:', navigationResult);
    } catch (error) {
      console.error('Error in submission or navigation:', error);
      // Optionally, reopen the popup or show an error message
      // setOpenPopup(true);
    }
  };
  
  const drawOverlay = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const { width, height } = video.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
  
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, width, height);
  
      // Draw semi-transparent overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, width, height);
     
      // Clear and stroke the area for text capture
      const rectWidth = width * 1; // Adjusted for responsiveness
      const rectHeight = height * 0.35; // Adjusted for responsiveness
      const rectX = (width - rectWidth) / 2;
      const rectY = (height - rectHeight) / 2;
      ctx.clearRect(rectX, rectY, rectWidth, rectHeight);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);
  
      // Dynamically adjust font size
      const fontSize = Math.floor(width / 50); // Example dynamic font size calculation
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
  
      // Adjust text positioning
      ctx.fillText('Align text within box and capture', width / 2, rectY - 10);
    }
  };
  
  const captureFrame = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const video = videoRef.current;
  
    if (!video) return;
  
    const captureWidthRatio = 1;
    const captureHeightRatio = 0.3; // Adjust as needed
    const rectX = video.videoWidth * (1 - captureWidthRatio) / 2;
    const rectY = video.videoHeight * (1 - captureHeightRatio) / 2;
    const rectWidth = video.videoWidth * captureWidthRatio;
    const rectHeight = video.videoHeight * captureHeightRatio;
  
    canvas.width = rectWidth;
    canvas.height = rectHeight;
  
    context.drawImage(
      video, 
      rectX, rectY, 
      rectWidth, rectHeight,
      0, 0, 
      rectWidth, rectHeight
    );
  
    // Preprocess the image
    let imgData = context.getImageData(0, 0, rectWidth, rectHeight);
  imgData = preprocessImage(imgData); // Apply preprocessing steps
  context.putImageData(imgData, 0, 0);

  setCaptureImage(canvas.toDataURL('image/png'));

  const tesseractOptions = {
    logger: m => console.log(m),
    tessedit_ocr_engine_mode: Tesseract.OEM.TESSERACT_ONLY // Changed to oem: 0
  };

  Tesseract.recognize(
    canvas.toDataURL('image/png'),
    'eng',
    tesseractOptions
  ).then(({ data: { text } }) => {
    const filteredText = text.trim().split('').filter(c => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-".includes(c)).join('');
    setCabinId(filteredText); // Update state with filtered text
  }).catch(error => console.error('OCR error:', error));
};

// Preprocess image data for Tesseract
const preprocessImage = (imgData) => {
  // Convert to grayscale
  for (let i = 0; i < imgData.data.length; i += 4) {
    const luma = imgData.data[i] * 0.299 + imgData.data[i + 1] * 0.587 + imgData.data[i + 2] * 0.114;
    imgData.data[i] = imgData.data[i + 1] = imgData.data[i + 2] = luma;
    imgData.data[i + 3] = 255; // Full alpha
  }

  // Invert colors
  for (let i = 0; i < imgData.data.length; i += 4) {
    imgData.data[i] = 255 - imgData.data[i];       // Red
    imgData.data[i + 1] = 255 - imgData.data[i + 1]; // Green
    imgData.data[i + 2] = 255 - imgData.data[i + 2]; // Blue
  }

  return imgData;
};
  

  return (
    <Box>
     
   
      <Box sx={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#1b2635',
    p: { xs: 2, sm: 3, md: 4 }, // Padding responsive to screen size
 
  }}>
       <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Navbar />
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} sx={{ height: 'calc(100% - 64px)', boxSizing: 'border-box' ,   marginLeft:8 , marginTop: 10 }}>
      {/* Responsive column for inspections on the left */}
      <Grid item xs={3.5} sm={3.5} md={3} lg={3}>
          <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
            Previous Records
          </Typography>
          <Box sx={{ overflowY: 'auto', maxHeight: 'calc(100% - 64px)', paddingRight: '66px' , height: '100%'}}> {/* Adjust the maxHeight to prevent scrolling */}
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              inspections.map((inspection, index) => (
                <StyledRecord key={index} onClick={() => handleRowClick(inspection.id)} sx={{ cursor: 'pointer' }}>
                  <Typography variant="subtitle1" sx={{ wordBreak: 'break-all', overflowWrap: 'break-word' }}>
  {`Cabin Id: ${inspection.cabin_id}`}
</Typography>
             
                  {/* More details */}
                </StyledRecord>
              ))
            )}
          </Box>
        </Grid>
        {/* Column for the camera and related controls on the right */}
        <Grid item xs={7} sm={7} md={8} lg={7}>
          <Box sx={{ height: '72%', position: 'relative' }}>
            <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      
          <TextField 
              label="Cabin ID" 
              value={cabinId} 
              onChange={(e) => {
                setCabinId(e.target.value);
                if (e.target.value.trim()) setCabinIdError(''); // Clear error when user starts typing
              }} 
              variant="outlined" 
              size="small" 
              sx={{ mt:4,mr: 1, width: 'auto', flexGrow: 1 }} 
              error={!!cabinIdError} // Show error state
              helperText={cabinIdError} // Display error message
              inputProps={{
                maxLength: 100
              }}
            />
            <Button variant="contained" onClick={captureFrame} sx={{mt:4, mr: 1 }}>
              Capture
            </Button>
            <Button variant="contained" onClick={handleSubmit} sx={{mt:4, mr: 1 }}>
              Submit
            </Button>  
          </Box>
        </Grid>
      </Grid>
    <Dialog
      open={openPopup}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: {
          width: '300px', // Fixed width to prevent resizing
        },
      }}
    >
        <DialogTitle id="form-dialog-title">Details</DialogTitle>
        <DialogContent dividers style={{ overflowY: 'auto' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="unit-type-label">Unit Type</InputLabel>
                <Select
                  labelId="unit-type-label"
                  id="unit-type"
                  value={unitType}
                  label="Unit Type"
                  onChange={(e) => setUnitType(e.target.value)}
                >
                  <MenuItem value="Residence">Residence</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
      <InputLabel id="customer-label">Customer</InputLabel>
      <Select
        labelId="customer-label"
        id="customer"
        value={customer}
        label="Customer"
        onChange={(e) => setCustomer(e.target.value)}
      >
        {customers.map((cust) => (
          <MenuItem key={cust.id} value={cust.id}>{cust.name}</MenuItem>
          // Assuming each customer has an 'id' and 'name', adjust as necessary
        ))}
      </Select>
    </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePopupSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
    </Box>
  );
  
};

export default CabinComponent;

