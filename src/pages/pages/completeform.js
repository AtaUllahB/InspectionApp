import React, { useState, useEffect, useRef  } from 'react';
import { useQualityPoints } from '../../contexts/QualityPointsContext';
import { useRouter } from 'next/router';
import { Box, Typography, Button, TextField, IconButton, CssBaseline, Checkbox, FormControlLabel, Modal, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { patchInspectionDetails, getInspectionDetails } from '../../services/inspectionService';

const theme = createTheme({
  palette: {
    background: {
      default: '#1b2635',
    },
  },
});

const CompleteForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const { name } = router.query;
  const { status } = router.query;
  const { img_addr } = router.query;
  // const [name, setName ]  = useState("");
  const [quantity, setQuantity] = useState(1);
  const [imageSrc, setImageSrc] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [loading, setLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  // const [status, setStatus] = useState('');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState(null); // State to hold the media stream
  
  const videoRef = useRef(null); // Ref for the video element
  const canvasRef = useRef(null);
  const { qualityPoints, loading: qualityPointsLoading } = useQualityPoints();

  const [inspectionDetails, setInspectionDetails] = useState([]);
  
   // Adjusted useEffect hook for handling camera stream
   useEffect(() => {
    let activeStream; // This will hold the active stream

    if (isCameraOpen) {
      console.log('Requesting camera access...');
       const constraints = { video: { facingMode: "environment" } };
      navigator.mediaDevices.getUserMedia(constraints)
      .then(currentStream => {
        setStream(currentStream);
        if (videoRef.current) videoRef.current.srcObject = currentStream;
      })
      .catch(error => console.error("Error accessing the camera: ", error));
    }
    else {
      // Cleanup function to stop the camera stream
      if (stream) {
        console.log('Releasing camera');
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }

    return () => {
      // Cleanup function to stop the camera stream
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOpen]); // Removed stream from dependency array to avoid frequent restarts


  


  useEffect(() => {
    if (id) {
      const fetchInspectionDetails = async () => {
        setLoading(true);
        try {
          console.log(id)
          // const data = await patchInspectionDetails(id,{});
          // console.log(data)
          // setStatus(data.status)
          // const imageUrl = URL.createObjectURL(data.img_addr);
          const defaultImage = '/image.png';
          const imageUrl = img_addr ? `${process.env.NEXT_PUBLIC_API_URL}${img_addr}` : defaultImage;
          // console.log(img_addr)
          setImageSrc(imageUrl);
          // setInspectionDetails(Array.isArray(data) ? data : [data]);
          // setName(qualityPoint.name)
          // const qualityPoint = qualityPoints.find(ip => ip.label === data.inspectionpoint_id);
          // console.log(qualityPoint)
        } catch (error) {
          console.error('Error fetching inspection details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchInspectionDetails();
    }
  }, [id]);
  // useEffect(() => {
  //   const getInspectionDetails = async (id) => {
  //     // Your code to fetch inspection details goes here
  //     // You may use fetch or any other HTTP client library to make the request
  //     // For example:
  //     const response = await getInspectionDetails(id);
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch inspection details');
  //     }
  //     return await response.json();
  //   };
  //   if (id) {
  //     setLoading(true);
  //     // Assuming getInspectionDetails is a function to fetch inspection details from the backend
  //     getInspectionDetails(id)
  //       .then(details => {
  //         if (details && details.img_addr) {
            
  //           setImageSrc(`${process.env.NEXT_PUBLIC_API_URL}${imgAddr}` );
  //           setStatus(details.status || 'Incomplete');
  //         } else {
  //           handleImageError();
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error fetching inspection details:', error);
  //         handleImageError();
  //       })
  //       .finally(() => setLoading(false));
  //   }
  // }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
    }
  };

  // Other component functions remain the same

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
  
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  
    // Draw current video frame onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
    // Convert canvas content to a blob (PNG format)
    canvas.toBlob((blob) => {
      if (!blob) return;
  
      // Create a File object with PNG format
      const file = new File([blob], "capture.png", { type: "image/png" });
  
      // Set the image source and file
      setImageSrc(URL.createObjectURL(blob));
      setImageFile(file);
      setIsCameraOpen(false); // Close the modal after capturing the photo
    }, "image/png");
  };
  


  // const handleCapture = () => {
  //   navigator.mediaDevices.getUserMedia({ video: true })
  //     .then(mediaStream => {
  //       const mediaStreamTrack = mediaStream.getVideoTracks()[0];
  //       const imageCapture = new ImageCapture(mediaStreamTrack);
  //       return imageCapture.takePhoto();
  //     })
  //     .then(blob => {
  //       const file = new File([blob], "fileName.png", { type: blob.type, lastModified: Date.now() });
  //       const imageUrl = URL.createObjectURL(blob);
  //       console.log(file)
  //       setImageSrc(imageUrl);
  //       setImageFile(file);
  //       setIsCameraOpen(false);
  //     })
  //     .catch(error => {
  //       console.error('Error capturing image:', error);
  //     });
  // };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
    if (stream) {
      console.log('Closing camera and releasing resources');
      stream.getTracks().forEach(track => track.stop());
      setStream(null); // Ensure stream state is reset
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    console.log(`Submitting update for ID: ${id} with quantity: ${quantity}, status: ${status}, and image: ${imageSrc}`);
    const dataToUpdate = {
      "status": "Complete",
      "img_addr":imageFile,
      "count":1,
    };
    const data = await patchInspectionDetails( id, dataToUpdate);
    console.log(data)
    router.push('/pages/reporttable');
  };

  const handleSkip = () => router.push('/pages/reporttable');

  const handleImageError = () => {
    setImageSrc('/path/to/default/fallback/image.png');
  };
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor={theme.palette.background.default} p={4} m={0}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: 'white' }}>{name}</Typography>
        <Typography variant="subtitle1" sx={{ mb: 2, color: 'white' }}>Status: {status}</Typography>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <img src={imageSrc} alt="Inspection Point" style={{ maxWidth: '100%', marginBottom: '20px' }} />
           <Button variant="contained" color="secondary" onClick={() => setIsCameraOpen(true)}>Capture Photo</Button>
            <Modal open={isCameraOpen} onClose={handleCloseCamera}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: '#1b2635', boxShadow: 40, p: 4, width: 800 }}>
                <IconButton sx={{ position: 'absolute',color:"white", top: 0, right: 0 }} onClick={handleCloseCamera}><CloseIcon /></IconButton>
                <Grid container justifyContent="center" spacing={2}>
                <Grid item lg={12} style={{width: '100%'}}> {/* Adjust the width as needed */}
                  <div style={{ position: 'relative', width: '100%', paddingTop: '50%' /* This maintains a 16:9 aspect ratio */, overflow: 'hidden' }}>
                    <video ref={videoRef} autoPlay playsInline style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover' // Adjust this to 'contain' if you don't want the video to be cropped
                    }}></video>
                   <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                  </div>
                </Grid>
                <Grid item xs={12}> {/* This ensures the button is on a new line and takes full width */}
                  <Button variant="contained" color="warning" onClick={handleCapture} style={{ marginTop: '20px' }}>
                    save
                  </Button>
                </Grid>
              </Grid>
              </Box>
            </Modal>
          </>
        )}
       <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <IconButton onClick={decrementQuantity} color="primary"><RemoveIcon /></IconButton>
          <TextField type="text" value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} InputProps={{ inputProps: { min: 0 }, sx: { color: 'white', '&::placeholder': { color: 'gray' } } }} sx={{ margin: '0 6px', maxWidth: '60px' }} />
          <IconButton onClick={incrementQuantity} color="primary"><AddIcon /></IconButton>
        </Box>

        <FormControlLabel
          control={<Checkbox checked={isComplete} onChange={(e) => setIsComplete(e.target.checked)} />}
          label="Mark as Complete"
          sx={{ color: 'white' }} // Set the text color to white
        />
        {isComplete && <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>Submit</Button>}
        <Button variant="contained" color="error" onClick={handleSkip} sx={{ mt: 4, color: 'white' }}>Cancel</Button>
      </Box>
    </ThemeProvider>
  );
};

export default CompleteForm;
