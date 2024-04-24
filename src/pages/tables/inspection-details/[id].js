import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getInspectionDetails } from '../../../services/inspectionService'; // Ensure this is the correct import path
import { Box, Typography, Grid, Card, CardContent, CardMedia,Button,  CssBaseline } from '@mui/material';
// ... other imports


const InspectionDetailsComponent = () => {
    const router = useRouter();
    const { id } = router.query;
    const [inspectionDetails, setInspectionDetails] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (id) {
        const fetchInspectionDetails = async () => {
          setLoading(true);
          try {
            const data = await getInspectionDetails(id);
            setInspectionDetails(Array.isArray(data) ? data : [data]);
          } catch (error) {
            console.error('Error fetching inspection details:', error);
          } finally {
            setLoading(false);
          }
        };
  
        fetchInspectionDetails();
      }
    }, [id]);
  
    const renderImage = (imgAddr) => {
      const defaultImage = '/image.png';
      const imageUrl = imgAddr ? `${process.env.NEXT_PUBLIC_API_URL}${imgAddr}` : defaultImage;
      return (
        <CardMedia
          component="img"
          image={imageUrl}
          alt="Inspection Detail"
          sx={{ width: 'auto', height: 140, margin: 'auto' }}
        />
      );
    };
  
    const handleBack = () => {
      router.back();
    };
  
    return (
        <>
        <CssBaseline style={{ backgroundColor: '#1b2635' }} />
      <Box  sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, maxHeight: '100vh', overflowY: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Inspection Details for ID: {id}
        </Typography>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <React.Fragment>
            <Grid container spacing={2}>
              {inspectionDetails.map((detail) => (
                <Grid item xs={12} sm={6} md={4} key={detail.id}>
                 
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Inspection Point ID: {detail.inspectionpoint_id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Name: {detail.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {detail.status}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Inspection ID: {detail.inspection_id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Created At: {new Date(detail.created_at).toLocaleString()}
                    </Typography>
                    {/* Add more details as needed */}
                  </CardContent>
                    {renderImage(detail.img_addr)}
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 ,mb:2 }}>
              <Button variant="contained" onClick={handleBack}>
                Back
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
      </>
    );
  };
  
  export default InspectionDetailsComponent;
  
