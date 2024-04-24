import React, { createContext, useContext, useState } from 'react';

const CameraContext = createContext();

export const useCamera = () => useContext(CameraContext);

export const CameraProvider = ({ children }) => {
  const [cameraStream, setCameraStream] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      // Now the stream is available in the context and can be used by any component
    } catch (error) {
      console.error("Error accessing the camera", error);
    }
  };

  const stopCameraStream = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null); 
    }
  };

  return (
    <CameraContext.Provider value={{ startCamera, stopCameraStream }}>
      {children}
    </CameraContext.Provider>
  );
};
