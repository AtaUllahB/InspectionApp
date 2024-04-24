import React, { useState, createContext } from 'react';

// Create a Context for the current inspection ID
export const InspectionIdContext = createContext(null);

export const InspectionIdProvider = ({ children }) => {
  // Rename inspectionId to currentInspectionId
  const [currentInspectionId, setCurrentInspectionId] = useState('');

  const updateInspectionId = (newId) => {
    console.log(`Updating currentInspectionId to: ${newId}`); // Update the log statement as well
    setCurrentInspectionId(newId); // Update the state setting function
  };

  return (
    // Rename inspectionId to currentInspectionId in the value object as well
    <InspectionIdContext.Provider value={{ currentInspectionId, updateInspectionId }}>
      {children}
    </InspectionIdContext.Provider>
  );
};
