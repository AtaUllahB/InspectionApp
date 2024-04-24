import React, { useState, useEffect, useRef, useContext } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import { detect, detectVideo } from '../../../../utils/detect'; 
import { useRouter } from 'next/router';
import ComponentB from '../../../../utils/detect'; 
import { Webcam } from '../../../../utils/webcam';
//import imageDataUrl from "./utils/renderBox";
import { QualityPointsContext,useQualityPoints } from '../../../../contexts/QualityPointsContext'; // Adjust the import path as necessary
import { ActiveTitleContext } from '../../../../contexts/ActiveTitleContext';
import { useInspection } from '../../../../contexts/InspectionContext';
import { InspectionIdContext } from '../../../../contexts/InspectionIdContext'; // Adjust the path to where your context is exported
import { useTitleManagement } from '../../../../contexts/TitleManagementContext';
import { useActiveTitle } from '../../../../contexts/ActiveTitleContext';
import { DataPostedContext } from '../../../../contexts/DataPostedContext';
import { myImageBase64 } from '../base64Images';
import {  postInspectionDetails }  from '../../../../services/cabinidService'; // Adjust import path as necessary

const webcam = new Webcam(); // webcam handler  

const App = () => {
  const [isSubmittedForTitle, setIsSubmittedForTitle] = useState(false);

 var [signal,setSignal]=useState(null);
 const { qualityPoints, loading } = useContext(QualityPointsContext); // Use the context to access quality points


 const [base64String,setbase64String]=useState(null);
 const [inspectionIdorg, setInspectionId] = useState('');
 const { activeTitle, setActiveTitle } = useContext(ActiveTitleContext); // Using context to track active title
 const { currentInspectionId, updateInspectionId } = useContext(InspectionIdContext);
 const { dataPosted, setDataPosted } = useContext(DataPostedContext);
 const { skipFlag, setSkipFlag } = useContext(DataPostedContext);
 const [selectedInspectionId, setSelectedInspectionId] = useState(null); // State to hold the selected inspection ID
 const [selectedInspectionLabel, setSelectedInspectionLabel] = useState(''); 
 const [selectedInspectionPointQuantity, setSelectedInspectionPointQuantity] = useState(1); 
 const [textString,settextString]=useState(' ');
 const { advanceToNextTitle } = useInspection();
 const [detectedLabel, setDetectedLabel] = useState('');

// In your CameraComponent
// useEffect(() => {
//   if (detectedLabel) {
//     setActiveTitle(detectedLabel); // Set the detected label as the active title
//   }
// }, [detectedLabel, setActiveTitle]);
// const moveToNextTitle = () => {
//   const currentIndex = qualityPoints.findIndex(title => title.name === activeTitle);
//   const nextIndex = currentIndex + 1 < qualityPoints.length ? currentIndex + 1 : 0; // Wrap to the first title if at the end
//   const nextTitle = qualityPoints[nextIndex];
//   setActiveTitle(nextTitle.name); // Update the active title in the context
// };

useEffect(() => {
  // Retrieve the geninspectionId from localStorage when the component mounts
  const storedInspectionId = localStorage.getItem('geninspectionId');
  console.log('Received local inspectionId from context: ' + storedInspectionId);

  if (storedInspectionId) {
    setInspectionId(storedInspectionId);
    // If you're using a context to manage inspectionId, update it here as well
    updateInspectionId(storedInspectionId); // Assuming this function exists in your InspectionIdContext
  }
}, []);
 // Example detection logic that updates the detectedLabel state
//  const handleDetection = (label) => {
//    setDetectedLabel(label); // label is the detected label from your detection algorithm
//  };
 const [model, setModel] = useState({
   net: null,
   inputShape: [1, 0, 0, 3],
 }); // init model & input shape

//  useEffect(() => {
//   // Use qualityPoints data to automatically set an inspection ID
//   if (!loading && qualityPoints.length > 0) {

//     const inspectionId = qualityPoints.id;
//     const label= qualityPoints.label ;
//     console.log(`Automatically selected inspection ID: ${inspectionId} and label: ${label}`);
//     setSelectedInspectionId(inspectionId); // Automatically set the selected inspection ID
//     setSelectedInspectionLabel(label);
//   }
// }, [qualityPoints, loading]);
  const cameraRef = useRef(null);
  const canvasRef = useRef(null);
  const imareSrc = useRef(null);

  // model configs
  const modelName = "yolov8s";
  
  useEffect(() => {
    console.log("TensorFlow.js is ready", tf.ready);
    tf.ready().then(async () => {
      const yolov8 = await tf.loadGraphModel(`/yolov8s_web_model/model.json`);
      console.log(`Model loaded: ${modelName}`);
      const dummyInput = tf.ones(yolov8.inputs[0].shape);
      yolov8.execute(dummyInput); // Warmup the model
      setModel({ net: yolov8, inputShape: yolov8.inputs[0].shape });
      tf.dispose([dummyInput]); // cleanup memory
      webcam.open(cameraRef.current);
    }).catch(error => console.error("Error in TensorFlow.js model loading or webcam opening", error));
  }, []);
  useEffect(() => {
    console.log('fetch quality points in camera.js:', qualityPoints);
  }, [qualityPoints]); 


  useEffect(() => {
    // Automatically update the selected inspection ID based on the active title
    if (!loading && qualityPoints.length > 0 && activeTitle ) {
      console.log('Active Title:', activeTitle);
      console.log('Quality Points:', qualityPoints);
      const foundPoint = qualityPoints.find(point => point.name === activeTitle);
      const inspectionId= foundPoint.id;
      const label = foundPoint.label;
      const quantity = foundPoint.check_quantity;

      console.log(`point label is ${inspectionId}`);
      if (inspectionId !== undefined) {
        setSelectedInspectionId(inspectionId);
        setSelectedInspectionLabel(label);
        setSelectedInspectionPointQuantity(quantity);
        setSignal(label);
        console.log(`Inspectionpoint ID and label for '${activeTitle}': ${inspectionId} and ${label}`);
        // Now you can use `inspectionId` as part of your model input
      }
    }
    else{
      console.log(loading,qualityPoints,activeTitle);
    }
  }, [qualityPoints, loading, activeTitle]);
  
  const [submissionStatus, setSubmissionStatus] = useState({});
  
 useEffect(() => {
  console.log('useEffect triggered with conditions:', { skipFlag,textString, selectedInspectionLabel, selectedInspectionId, submissionStatus });
  const staticImageBase64 = myImageBase64; 

  const prepareAndPostImage = async (fileObject, isBase64 = false) => {
   
    let status = "inComplete"; 
    let quantity = 0;
    if(selectedInspectionLabel=== -1  )
     {
       status = "inComplete";
     }
     else if( textString=== selectedInspectionLabel  ){
      quantity=1;
      if(selectedInspectionPointQuantity> 1)status = "Partial";
      else status="Complete";

     }
     else if(skipFlag)
     {
      status = "inComplete";
     // setSkipFlag(false);
      quantity =0; 
     }
     
    const inspectionDetails = {
      img_addr: fileObject,
      inspectionpoint_id: selectedInspectionId,
      inspection_id: inspectionIdorg,
      status: status,
      count: quantity
    };
    // console.log('Posting inspection details with image:', { inspectionDetails });
    try {
           // Mark as submitted to prevent duplicate submissions
       console.log("the data posted flag is", dataPosted);
       setTimeout(() => {
        setDataPosted(true);
       }, 3000);
       console.log("the data posted flag is", dataPosted);
      const response = await postInspectionDetails(inspectionDetails);
      console.log('Success:', response);
      setSubmissionStatus(prev => ({ ...prev, [selectedInspectionId]: true }));
     // setDataPosted(true);
      if(skipFlag) setSkipFlag(false);
       // Delay before moving to the next title
       settextString("");
   // setSignal(-1);
    console.log("resetting the signal for inference stop")
    
    } catch (error) {
      console.error('Error posting inspection details:', error);
    }    
  };
  const canSubmit = selectedInspectionId && !submissionStatus[selectedInspectionId];

  if (canSubmit) {
    let imageToSubmit = null;
    const fileName = `${new Date().toISOString()}_${activeTitle}.png`;
    if (skipFlag=== true) {
      console.log('Using static base64 image for submission');
      imageToSubmit=1;
      //imageToSubmit = base64ToFile(staticImageBase64, fileName);
    } else if (textString == selectedInspectionLabel && base64String) {
      console.log('Using dynamic base64 image for submission');
      imageToSubmit = base64ToFile(base64String, fileName);
    }

    if (imageToSubmit) {
      prepareAndPostImage(imageToSubmit, true);
    }

  }
}, [skipFlag,base64String,selectedInspectionLabel, activeTitle,submissionStatus]);


 function base64ToFile(dataURI, fileName) {
    // Split the base64 string into parts
    const parts = dataURI.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new File([uInt8Array], fileName, { type: contentType });
  }
  return (
    <div className="App">
     

      <div className="content">
        
        <video
          autoPlay
          muted
          ref={cameraRef}
          style={{ display: "block" }} // Ensure video is displayed
          onPlay={() => detectVideo(cameraRef.current, model, canvasRef.current, setbase64String,settextString)}
        />
        
        
        <canvas width={model.inputShape[1]} height={model.inputShape[2]} ref={canvasRef} />
      </div>
      <div>
          {/* <img src={base64String} alt="" /> */}
       </div>
        <div>
        {/* <div>Selected Inspection ID: {selectedInspectionId}</div>
      <div>
        <input type="number" id="ModelOutput" placeholder="Model ID"  value={textString}  onChange={(e) => settextString(e.target.value)} />
        </div> */}

<ComponentB signal={signal} />
   </div>
    </div>
    
  );
};
export default App;