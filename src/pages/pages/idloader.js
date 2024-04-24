import React, { useState, useRef, useEffect , useContext} from 'react';
import { useRouter } from 'next/router';
import { Box, Button, AppBar, Toolbar, Typography, LinearProgress, TextField, Grid } from '@mui/material';
import Tesseract from 'tesseract.js';
import Navbar from '../components/CommonNavbar'; // Adjust the import path as necessary
import { useCabin } from '../../contexts/CabinContext'; // Adjust the path as necessary
const CameraPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const videoRef = useRef(null);
  // Initialize state for cabinId from query parameters
  const [localCabinId, setLocalCabinId] = useState(''); // Local state for cabinId

  const { setCabinId } = useCabin();
  useEffect(() => {
    const queryCabinId = router.query.cabinId;
    if (queryCabinId) {
      setCabinId(queryCabinId); // Update context
      setLocalCabinId(queryCabinId); // Update local state
    }
  }, [router.query.cabinId, setCabinId]);


  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const openCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setIsLoading(true); // Indicate that loading or processing is happening
          setTimeout(() => setIsLoading(false), 3000); // Simulate an asynchronous operation like fetching or processing
        }
      } catch (error) {
        console.error('Error accessing the camera:', error);
        setIsLoading(false); // Stop loading indication on error
      }
    };

    openCamera();

    return () => {
      document.body.style.overflow = ''; // Reset body overflow when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop()); // Stop camera stream
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  const handleCancel = () => {
    router.push('/pages/scancabinid'); // Navigate back or to another page as necessary
  };

  const handleNext = () => {
    // Here, you can perform actions before navigating to the next page
    router.push('/inspectordashboard/inspectordashboard'); // Adjust the navigation path as necessary
  };

  return (
    <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', backgroundColor: '#1b2635'  }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Navbar /> {/* Your custom navbar component */}
        </Toolbar>
      </AppBar>

      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', maxWidth: '600px', maxHeight: '600px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }} />
        {isLoading && <LinearProgress color="secondary" />}
      </Box>

      <Box sx={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '20px' }}>
        {/* <TextField
          fullWidth
          label="Cabin ID"
          value={localCabinId} 
          variant="outlined"
          size="small"
          InputProps={{ readOnly: true }} // Make the TextField read-only if you're not allowing edits
          sx={{  borderRadius: 1 }}
        /> */}
        <Button variant="contained" onClick={handleCancel}>Cancel</Button>
        <Button variant="contained" onClick={handleNext}>Next</Button>
      </Box>
    </Box>
  );
};

export default CameraPage;
