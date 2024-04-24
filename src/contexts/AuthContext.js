import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    accessToken: null,
    refreshToken: null
  });

  useEffect(() => {
    // Check if user data and tokens exist in localStorage and update state
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (storedAccessToken && storedRefreshToken) {
      setAuthState(state => ({
        ...state,
        isAuthenticated: true,
        accessToken: storedAccessToken,
        refreshToken: storedRefreshToken
      }));
    }
  }, []);

  const login = (userData, accessToken, refreshToken) => {
    // Save tokens to localStorage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    
    setAuthState({
      isAuthenticated: true,
      user: userData,
      accessToken,
      refreshToken
    });
  };

  const logout = () => {
    // Clear tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    setAuthState({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null
    });
  };

  // Refresh token logic goes here (if implemented)

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
