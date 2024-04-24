import React, { useState, useEffect,  useRef } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet-async';
import {
  Grid,
  Button,
  Divider as MuiDivider,
  Typography as MuiTypography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { spacing } from '@mui/system';
import InspectorDashboardLayout from '../../layouts/InspectorDashboard';
import { fetchQualityPointsByUnitType } from '../../services/cabinidService'; // Adjust import path as necessary
import CameraPage from '../pages/idloader';
import App from '../../components/pages/dashboard/default/Camera'
import { Card, CardContent } from '@mui/material';
import { useQualityPoints } from '../../contexts/QualityPointsContext'; // Import the context hook
import { useActiveTitle } from '../../contexts/ActiveTitleContext';
//import App from "../../../src/App";
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

const NextButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  right: theme.spacing(2),
  bottom: theme.spacing(2),
  zIndex: 1000,
}));


const CameraWrapper = styled.div({
  position: 'relative',
  // Set any additional styles for the camera wrapper
});

const TransparentCard = styled(Card)(({ theme }) => ({
  position: 'absolute', // Position relative to the CameraWrapper
  top: theme.spacing(100), // Adds margin from the bottom
  left: '50%',
  transform: 'translateX(-40%)', // Centers the card
  width: 'auto', // Makes the width content-dependent
  maxWidth: '90%', // Ensures the card is not too wide on small screens
  backgroundColor: 'rgba(255, 255, 255, 0.2)', // Adjust transparency as needed
  padding: theme.spacing(1),
  zIndex: 900, // Ensure it's above the camera component
}));

const useLockOrientation = (orientation) => {
  useEffect(() => {
    const lockOrientation = async () => {
      try {
        await screen.orientation.lock(orientation);
      } catch (error) {
        console.error(error);
      }
    };

    // Call this function based on a user action for better compatibility
    document.addEventListener('click', lockOrientation);

    return () => {
      document.removeEventListener('click', lockOrientation);
    };
  }, [orientation]);
};
function Default() {
  
 useLockOrientation('landscape');
  const router = useRouter();
  const [titles, setTitles] = useState([]);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isInspectionStarted, setIsInspectionStarted] = useState(false); // New state to track if the inspection has started
  const isInitialMount = useRef(true); // useRef to track the initial mount
  const { qualityPoints, loading } = useQualityPoints(); 
  const { setActiveTitle,activeTitle } = useActiveTitle(); // Hook to update the active title
  const titleToAudioMap = {
    "Skid Painting": "/audio/Skid Painting.mp3",
    "Ceiling and Roof": "/audio/Ceiling and Roof.mp3",
    "Gypsum Board": "/audio/Gypsum Board.mp3",
    "Door Cutting for Lock System": "/audio/Door Cutting for Lock System.mp3",
    "Heater": "/audio/Heater.mp3",
    "Plumbing Fixture/Accessories Installation": "/audio/Plumbing fixture Accessories Installation.mp3",
    "Sprinkler Installation": "/audio/Sprinkler InstallationSprinkler Installation.mp3",
    "Internal and External Door Installation": "/audio/Internal and External Door Installation.mp3",
    "Toilet": "/audio/Toilet.mp3",
    "Window Installation": "/audio/Window Installation.mp3",
    "Kitchen Cabinet": "/audio/Kitchen Cabinet.mp3",
    "Internal and External Paint":"/audio/Internal and External Paint.mp3"
  };
  
  
  // ...
  
  // Replace your existing useEffect for speech synthesis with this:
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false; // Mark initial mount complete
    } else if (isInspectionStarted && titles.length > 0) {
      // The titles in the state need to match the keys in `titleToAudioMap`
      setActiveTitle(titles[currentTitleIndex]);
      speakTitle(titles[currentTitleIndex]);
    }
  },[currentTitleIndex, isInspectionStarted, titles, setActiveTitle]);
  useEffect(() => {
    // This effect is for automatically moving to the next title
    let interval = null;
    if (isInspectionStarted && currentTitleIndex < titles.length - 1) {
      interval = setInterval(() => {
        handleNextClick(); // Reuse the handleNextClick method for automatic advancement
      }, 15000); // Change every 3 seconds
    }

    return () => {
      if (interval) {
        clearInterval(interval); // Clear the interval when the component unmounts or condition changes
      }
    };
  }, [isInspectionStarted, currentTitleIndex, titles.length]); // Depend on these values to reset the interval correctly





  useEffect(() => {
    // You no longer fetch data here directly as it is provided by the context
    // Instead, you can directly use qualityPoints to set your titles
    if (!loading && qualityPoints.length > 0) {
      setTitles(qualityPoints.map(item => item.name));
    }
  }, [qualityPoints, loading]); 
  
  // Consolidated useEffect for handling speech synthesis
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false; // Mark initial mount complete
    } else if (isInspectionStarted && titles.length > 0) {
      speakTitle(`Move towards ${titles[currentTitleIndex]}`);
    }
  }, [currentTitleIndex, isInspectionStarted]); // Removed titles from dependency array

  const handleStartInspection = () => {
    setIsInspectionStarted(true);
    // Optionally trigger speech for the first title here if needed immediately
    // But ensure it doesn't conflict with your user flow
  };
  const NextButton = styled(Button)(({ theme }) => ({
    position: 'fixed',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    zIndex: 1000,
    backgroundColor: '#DCDCDC', // Light gray background color
    color: 'black', // Default text color
    '&:hover': {
      backgroundColor: '#C0C0C0', // Slightly darker gray on hover
      color: 'white', // Text color changes to white on hover
    },
    borderRadius: theme.shape.borderRadius * 20, // Increase the border radius for an oval shape
    padding: theme.spacing(1, 4), // Adjust padding as needed for your design
    textTransform: 'none', // Keeps the text style as is (not uppercase)
  }));
  
  const handleNextClick = () => {
    if (currentTitleIndex < titles.length - 1) {
      // Move to the next title
      setCurrentTitleIndex(currentTitleIndex + 1);
    } else {
      // Last title, navigate to the next page
      router.push('/pages/reporttable');
    }
  };
  return (
    <React.Fragment>
      <Helmet title="Dashboard" />
     
    </React.Fragment>
  );
}

Default.getLayout = function getLayout(page) {
  return <InspectorDashboardLayout>{page}</InspectorDashboardLayout>;
};

export default Default;
