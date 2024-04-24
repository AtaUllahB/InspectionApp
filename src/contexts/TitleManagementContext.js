// contexts/TitleManagementContext.js
import React, { createContext, useContext, useState } from 'react';

const TitleManagementContext = createContext();

export const useTitleManagement = () => useContext(TitleManagementContext);

export const TitleManagementProvider = ({ children }) => {
  const [titleStatuses, setTitleStatuses] = useState({});
  const [titleSubmissions, setTitleSubmissions] = useState({});

  const updateTitleStatus = (title, status) => {
    setTitleStatuses(prev => ({ ...prev, [title]: status }));
  };

  const markTitleAsSubmitted = (title, isSubmitted) => {
    setTitleSubmissions(prev => ({ ...prev, [title]: isSubmitted }));
  };

  return (
    <TitleManagementContext.Provider value={{ titleStatuses, updateTitleStatus, titleSubmissions, markTitleAsSubmitted }}>
      {children}
    </TitleManagementContext.Provider>
  );
};
