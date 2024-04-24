// Pseudocode for InspectionContext
import React, { createContext, useContext, useState } from "react";

const InspectionContext = createContext();

export const useInspection = () => useContext(InspectionContext);

export const InspectionProvider = ({ children }) => {
  const [inspectionState, setInspectionState] = useState({
    currentLabel: "",
    currentTitleIndex: 0,
    titles: ["Title1", "Title2"], // Example titles
  });

  const advanceToNextTitle = () => {
    setInspectionState(prevState => ({
      ...prevState,
      currentTitleIndex: prevState.currentTitleIndex + 1,
    }));
  };

  return (
    <InspectionContext.Provider value={{ inspectionState, advanceToNextTitle }}>
      {children}
    </InspectionContext.Provider>
  );
};
