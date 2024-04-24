import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchQualityPointsByUnitType } from '../services/cabinidService'; // adjust the path as necessary

export const QualityPointsContext = createContext();
export const useQualityPoints = () => {
  return useContext(QualityPointsContext);
};
export const QualityPointsProvider = ({ children }) => {
  const [qualityPoints, setQualityPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [audioplaying, setAudioplaying] = useState(false);

  const contextValue = {
    qualityPoints,
    setQualityPoints,
    loading,
    setLoading, 
    audioplaying,
    setAudioplaying
  };


  // useEffect(() => {
  //   const unitType = localStorage.getItem('unitType');
  //   const fetchType = unitType === 'A' ? 'Residence' : unitType === 'E' ? 'Others' : 'Residence';

  //   fetchQualityPointsByUnitType(fetchType)
  //     .then((data) => {
  //       setQualityPoints(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error('Failed to fetch quality points:', error);
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <QualityPointsContext.Provider value={contextValue}>
      {children}
    </QualityPointsContext.Provider>
  );
};