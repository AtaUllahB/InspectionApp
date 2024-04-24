import React, { createContext, useContext, useState, useEffect } from 'react';

const CabinContext = createContext();

export const useCabin = () => useContext(CabinContext);

export const CabinProvider = ({ children }) => {
  const [cabinId, setCabinId] = useState('');

  // Effect for handling the localStorage
  useEffect(() => {
    // Get cabinId from localStorage if available
    const storedCabinId = localStorage.getItem('cabinId');
    if (storedCabinId) {
      setCabinId(storedCabinId);
    }
  }, []);

  // Effect for updating localStorage when cabinId changes
  useEffect(() => {
    if (cabinId) {
      localStorage.setItem('cabinId', cabinId);
    }
  }, [cabinId]);

  return (
    <CabinContext.Provider value={{ cabinId, setCabinId }}>
      {children}
    </CabinContext.Provider>
  );
};
