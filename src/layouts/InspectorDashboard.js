
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom'
import { Box, CssBaseline, Paper as MuiPaper, Slider ,Card ,Typography, CardContent} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { spacing } from '@mui/system';
import {Sliders} from 'react-feather'
import GlobalStyle from '../components/GlobalStyle';
import Navbar from '../components/navbar/InspectorNavbar';
// Remove static import of inspectordashboardItems
import Sidebar from '../components/sidebar/InspectorSidebar';
import Settings from '../components/Settings';
import { ActiveTitleProvider } from '../contexts/ActiveTitleContext';
import { fetchQualityPointsByUnitType } from '../services/cabinidService'; // Adjust the path as necessary
import SidebarItemWithStatus from '../components/sidebar/SidebarItemWithStatus'; // Import the new component
import { QualityPointsContext,useQualityPoints } from '../contexts/QualityPointsContext';
const drawerWidth = 258;
import { CheckCircle, Error, Warning } from '@mui/icons-material';
import { green, red, amber,grey } from '@mui/material/colors';
import { useCabin } from '../contexts/CabinContext'; // Adjust the path as necessary
// ... other imports and styles
import { ActiveTitleContext } from '../contexts/ActiveTitleContext';
import { DataPostedContext, useDataPosted } from '../contexts/DataPostedContext';
import { LinearProgress, AppBar as MuiAppBar, Toolbar, IconButton } from '@mui/material';
import React, { useState, useEffect,  useRef, useContext } from 'react';
import { useTitleManagement } from '../contexts/TitleManagementContext';
import { Helmet } from 'react-helmet-async';
import {Howl, Howler} from "howler"
import {
  Grid,
  Button,
  Divider as MuiDivider,
  Typography as MuiTypography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import App from '../components/pages/dashboard/default/Camera'
import { useActiveTitle } from '../contexts/ActiveTitleContext';
//import App from "../../../src/App";
const Divider = styled(MuiDivider)(spacing);


const NextButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  right: theme.spacing(2),
  bottom: theme.spacing(4),
  zIndex: 1000,
}));


const CameraWrapper = styled.div({
  position: 'relative',

  // Set any additional styles for the camera wrapper
});

const TransparentCard = styled(Card)(({ theme }) => ({
  position: 'absolute', // Position relative to the CameraWrapper
  top: theme.spacing(140), // Adds margin from the bottom
 
  left: '90%',
  transform: 'translateX(-40%)', // Centers the card
  width: '200px', // Makes the width content-dependent
  maxWidth: '100%', // Ensures the card is not too wide on small screens
  backgroundColor: 'rgba(255, 255, 255, 0.2)', // Adjust transparency as needed
  padding: theme.spacing(1),
  zIndex: 900, // Ensure it's above the camera component
}));


const StatusIcon = styled.span`
  margin-left: 8px; // Adjust spacing to fit your layout
`;

// Define a function to return the status icon based on the status
const getStatusIcon = (status) => {
  switch (status) {
    case 'complete':
      return <CheckCircle style={{ color: green[500] }} />;
    case 'partial':
      return <Warning style={{ color: amber[500] }} />;
    case 'incomplete':
      return <Error style={{ color: red[500] }} />;
    default:
      return <CheckCircle style={{ color: grey[500] }} />;
  }
};

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`

const Drawer = styled.div`
  ${(props) => props.theme.breakpoints.up('md')} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`
const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`


const Paper = styled(MuiPaper)(spacing)

const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`

const AppBar = styled(MuiAppBar)`
  background: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
`;

const StyledToolbar = styled(Toolbar)`
  min-height: 48px; // Or any other value to reduce the height
  padding-top: 0; // Remove padding top if needed
  padding-bottom: 0; // Remove padding bottom if needed
  // Adjust the above padding values as necessary
`;



const StyledButton = styled(Button)({
  minWidth: 'auto',
  padding: '6px',
  marginLeft: '16px', // Space between progress bar and button
  backgroundColor: 'red', // Red background for the button
  '&:hover': {
    backgroundColor: 'darkred', // Slightly darker on hover
  },
  '& .MuiButton-label': {
    color: '#fff', // White text/icon color
  },
});


const InspectorDashboard = ({ children }) => {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarItems, setSidebarItems] = useState([]); // This will store your sidebar items
  const [titlesWithStatus, setTitlesWithStatus] = useState([]);// This will store titles with their status
  const router = useRouter();
  const [titles, setTitles] = useState([]);
  
  // const [ qualityPoints, setQualityPoints] = useContext(DataPostedContext);
  const { qualityPoints, setQualityPoints } = useContext(QualityPointsContext);
  const { loading, setLoading } = useContext(QualityPointsContext);
  const { audioplaying, setAudioplaying } = useContext(QualityPointsContext);
  const { titleStatuses, updateTitleStatus, titleSubmissions, markTitleAsSubmitted } = useTitleManagement();
  // const [loading, setLoading] =useContext(DataPostedContext); 
  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
       
    const unitType = localStorage.getItem('unitType');
    // Define `fetchType` based on `unitType`
    const fetchType = unitType === 'A' ? 'Residence' : unitType === 'E' ? 'Others' : 'Residence';
  
    if (fetchType) {
      fetchQualityPointsByUnitType(fetchType)
        .then(data => {
        
          setQualityPoints(data);
          console.log('fetch quality points:', qualityPoints);
         
          setLoading(false);
        })
        .catch(error => {
          console.error('Failed to fetch quality points:', error);
       
          
          setLoading(false);
        });
    } else {
      console.error('Invalid unitType provided:', unitType);
      // Update loading state as no fetching will occur
      setLoading(false);
    }
  }, []); // Removed router.query.unitType from dependency array

 
  useEffect(() => {
    if (!loading && qualityPoints.length > 0) {
      const sidebarItems = qualityPoints.map(item => ({
        title: item.name,
        icon: Sliders,
        status: item.status, // Assume you have a status field in your data
      }));
      setSidebarItems(sidebarItems);
    }
  }, [qualityPoints, loading]);
  
  

  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    setMobileOpen(false)
  }, [router.asPath])

  // const router = useRouter();
  // const [titles, setTitles] = useState([]);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isInspectionStarted, setIsInspectionStarted] = useState(false); // New state to track if the inspection has started
  const isInitialMount = useRef(true); // useRef to track the initial mount
  // const { qualityPoints, loading } = useQualityPoints(); 
  const { dataPosted, setDataPosted } = useContext(DataPostedContext);
  const { skipFlag, setSkipFlag } = useContext(DataPostedContext);
  useEffect(() => {
    // Listen for changes to the boolean variable
    if (dataPosted) {
      // Trigger the next title jump when data is posted
      setCurrentTitleIndex(currentTitleIndex + 1);
     // setDataPosted(false);
      console.log('Data posted, triggering next title jump...');
    }
  }, [dataPosted]);


  const titleToAudioMap = {           
    "skid": new Howl({ src: ["/audio/Skid Painting.mp3", ], preload: true}),
    "roof": new Howl({ src: ["/audio/Ceiling and Roof.mp3", ], preload: true}),
    "external painting":new Howl({ src: ["/audio/External painting.mp3", ], preload: true}),
    "internal painting":new Howl({ src: ["/audio/Internal painting.mp3", ], preload: true}),
    "internal door installation": new Howl({ src: ["/audio/internal door installation.mp3", ], preload: true}),
    "external door installation": new Howl({ src: ["/audio/external door installation.mp3", ], preload: true}),
    "door lock": new Howl({ src: ["/audio/Door Cutting for Lock System.mp3", ], preload: true}),
    "window": new Howl({ src: ["/audio/Window Installation.mp3", ], preload: true}),
    "sprinkler detector": new Howl({ src: ["/audio/Sprinkler InstallationSprinkler Installation.mp3", ], preload: true}),
    "smoke detector": new Howl({ src: ["/audio/Smoke detector.mp3", ], preload: true}),
    "crack-gap": new Howl({ src: ["/audio/Crack-Gap.mp3", ], preload: true}),
    "gypsum board": new Howl({ src: ["/audio/Gypsum Board.mp3", ], preload: true}),
    "cabinet": new Howl({ src: ["/audio/Kitchen Cabinet.mp3", ], preload: true}),
    "sink": new Howl({ src: ["/audio/sink.mp3", ], preload: true}),
    "mirror": new Howl({ src: ["/audio/Mirror.mp3", ], preload: true}),
    "w c": new Howl({ src: ["/audio/Toilet.mp3", ], preload: true}),
    "drain": new Howl({ src: ["/audio/Toilet Drain.mp3", ], preload: true}),
    "shower": new Howl({ src: ["/audio/Toilet Shower.mp3", ], preload: true}),
    "bathroom window": new Howl({ src: ["/audio/Bathroom window.mp3", ], preload: true}),
    "shower-washroom-partition": new Howl({ src: ["/audio/Shower-washroom-partition.mp3", ], preload: true}),
    "exhaust": new Howl({ src: ["/audio/Toilet Exhaust.mp3", ], preload: true}),
    "heater": new Howl({ src: ["/audio/Heater.mp3", ], preload: true}),
    "skipping": new Howl({ src: ["/audio/Skipping this checkpoint.mp3", ], preload: true})
    
 };
 const speakTitle = async (title) => {
  console.log("speak tittle", title)
  if (!title) return;
  
  const audio = titleToAudioMap[title.toLowerCase()];
  // const audio = new Audio("https://bananaapis.bananaapps.com/resources/audio/Skid Painting.mp3")
  if (audio)
  {
    setAudioplaying(true);
    audio.play();
    audio.on("end", () => {
      setAudioplaying(false);
    })
  }
  // if (audio) {
  //   // const audio = new Audio(audioSrc);
  //   audio.addEventListener('error', (e) => {
  //     console.error(`Error playing audio for title "${title}":`, e);
  //   });
  // }
};
  
  // useEffect(() => {
  //   if (dataPosted) {
  //     // Code to trigger the next title jump
  //     moveToNextTitle();
      
  //     // Reset the boolean variable after jumping to the next title
  //     setDataPosted(false);
  //   }
  // }, [dataPosted]);

  // ...
  // Function to move to the next title
 const moveToNextTitle = () => {
  const currentIndex = titles.findIndex(title => title === activeTitle);
  const nextIndex = currentIndex + 1 < titles.length ? currentIndex + 1 : 0; // Wrap to the first title if at the end
  const nextTitle = titles[nextIndex];
  setActiveTitle(nextTitle); // Update the active title in the context
};

// useEffect(() => {
//   // This effect listens for changes in the `isSubmittedForTitle` state.
//   // When a submission is completed (isSubmittedForTitle is true), it moves to the next title and resets the submission flag.
//   if (isSubmittedForTitle) {
//     moveToNextTitle(); // Move to the next title
//     setIsSubmittedForTitle(false); // Reset the submission flag
//   }
// }, [isSubmittedForTitle, moveToNextTitle]);

  const { activeTitle, setActiveTitle } = useContext(ActiveTitleContext);
  // Replace your existing useEffect for speech synthesis with this:
  useEffect(() => {

    const fetchData = async () => {
      if (isInitialMount.current) {
        isInitialMount.current = false; // Mark initial mount complete
      } else if (isInspectionStarted && titles.length > 0) {
        if (qualityPoints.length === 0) {
          console.log("the list is empty", qualityPoints.length);
        }
        // The titles in the state need to match the keys in `titleToAudioMap`
        console.log(titles[currentTitleIndex]);
        setActiveTitle(titles[currentTitleIndex]);
        if (!audioplaying) 
          await speakTitle(titles[currentTitleIndex]);
          setTimeout(() => {
            setDataPosted(false);
           }, 2000);
          console.log("the data posted flag is==", dataPosted);
      }
    };
    if (!audioplaying)
    {
      fetchData();
    }        
  },[currentTitleIndex, isInspectionStarted, titles, setActiveTitle]);

  // useEffect(() => {
  //   // This effect is for automatically moving to the next title
  //   let interval = null;
  //   if (isInspectionStarted && currentTitleIndex < titles.length - 1) {
  //     interval = setInterval(() => {
  //       handleNextClick(); // Reuse the handleNextClick method for automatic advancement
  //     }, 15000); // Change every 3 seconds
  //   }

  //   return () => {
  //     if (interval) {
  //       clearInterval(interval); // Clear the interval when the component unmounts or condition changes
  //     }
  //   };
  // }, [isInspectionStarted, currentTitleIndex, titles.length]); // Depend on these values to reset the interval correctly




  const progress = 0;// 50% for demonstration
  const { cabinId } = useCabin(); // This hooks into the context to get the current cabinId
 

  useEffect(() => {
    // You no longer fetch data here directly as it is provided by the context
    // Instead, you can directly use qualityPoints to set your titles
    if (!loading && qualityPoints.length > 0) {
      setTitles(qualityPoints.map(item => item.name));
    }
  }, [qualityPoints, loading]); 
  // Consolidated useEffect for handling speech synthesis
  // useEffect(() => {
  //   const run = async () => {
  //     if (isInitialMount.current) {
  //       isInitialMount.current = false; // Mark initial mount complete
  //     } else if (isInspectionStarted && titles.length > 0 ) {
  //       await speakTitle(`Move towards ${titles[currentTitleIndex]}`);
  //     }
  //   }
  //   if ( !audioplaying)
  //   {
  //     run();
  //   }
  // }, [currentTitleIndex, isInspectionStarted]); // Removed titles from dependency array

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
    marginBottom: '10px',
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

  
  const handleNextClick = async () => {
    if (currentTitleIndex < titles.length) {
    
      console.log("sssssssssssg",audioplaying,dataPosted,skipFlag);
      if (!audioplaying && !dataPosted && !skipFlag)
      {
        console.log("skipingggg",audioplaying,dataPosted,skipFlag);
        speakTitle("skipping");
        setSkipFlag(true);   
      }
      
      // // Move to the next title
      // if(skipFlag || dataPosted)
      // {
      //   console.log("data sending in process")
      //   return;
      // }
      // else{
      //  await speakTitle("skipping");
      //  setSkipFlag(true);       
      // }     
     // setCurrentTitleIndex(currentTitleIndex + 1);
    } else {
      // Last title, navigate to the next page
      router.push('/pages/reporttable');
    }
  };

 
 return (
 
    <Root>
       
      <CssBaseline />
      <GlobalStyle />
      <Drawer>
        <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
          <Sidebar
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            items={sidebarItems} 
            footerType="typeTwo"
          />
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Sidebar
            PaperProps={{ style: { width: drawerWidth } }}
            items={sidebarItems} 
           footerType="typeTwo"
          />
        </Box>
      </Drawer>
      
      <Navbar onDrawerToggle={handleDrawerToggle} />
      <CameraWrapper>
       <App />
        <TransparentCard>
          <CardContent>
            <Typography variant="h6" color="#db493a" align="center">
            Move towards {titles[currentTitleIndex]} {/* Display the current title */}
            </Typography>
          </CardContent>
        </TransparentCard>
    
      </CameraWrapper>
     
      {!isInspectionStarted && (
        <NextButton variant="contained" color="primary" onClick={handleStartInspection}>
          {("Start Inspection")}
        </NextButton>
      )}
      {isInspectionStarted && (
        <NextButton variant="contained" disabled={skipFlag} color="primary" onClick={handleNextClick}>
          {currentTitleIndex < titles.length ? ("Skip") : ("Next")}
        </NextButton>
      )}
      <Settings />
    </Root>
  )
}


export default InspectorDashboard