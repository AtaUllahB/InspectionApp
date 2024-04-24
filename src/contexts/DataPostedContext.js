import React, { createContext, useContext, useState } from 'react';

export const DataPostedContext = createContext();

export const useDataPosted = () => {
  return useContext(DataPostedContext);
};

export const DataPostedProvider = ({ children }) => {
  const [dataPosted, setDataPosted] = useState(false);
  const [skipFlag, setSkipFlag] = useState(false);

  const contextValue = {
    dataPosted,
    setDataPosted,
    skipFlag,
    setSkipFlag, 
  };

  return (
    <DataPostedContext.Provider value={contextValue}>
      {children}
    </DataPostedContext.Provider>
  );
};
