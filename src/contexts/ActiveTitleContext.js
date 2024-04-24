import React, { createContext, useContext, useState } from 'react';

export const ActiveTitleContext = createContext();

export const useActiveTitle = () => {
  return useContext(ActiveTitleContext);
};

export const ActiveTitleProvider = ({ children }) => {
  const [activeTitle, setActiveTitle] = useState('');

  return (
    <ActiveTitleContext.Provider value={{ activeTitle, setActiveTitle }}>
      {children}
    </ActiveTitleContext.Provider>
  );
};
