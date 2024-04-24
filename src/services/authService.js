import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get the access token from localStorage
const getAccessToken = () => localStorage.getItem('accessToken');

// Function to save tokens to localStorage
const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
  console.log('Access Token Saved:', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  console.log('Refresh Token Saved:', refreshToken);
};

// Login function
export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/login', { email, password });
    // Assuming response.data contains the tokens directly as shown in your response structure
    setTokens(response.data.access_token, response.data.refresh_token); // Update based on actual keys
    console.log('Login success. Tokens are set.');
    console.log('Response Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

// Function to refresh the access token
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    const response = await axiosInstance.post('/refresh-token', { refreshToken });
    // Update tokens in local storage with new ones
    setTokens(response.data.access_token, response.data.refresh_token); // Update based on actual keys
    console.log('Access Token Refreshed:', response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error('Token refresh failed:', error.response?.data || error.message);
    throw error;
  }
};
// Axios response interceptor to handle token refresh on 401 Unauthorized response
axiosInstance.interceptors.response.use(response => response, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const newAccessToken = await refreshAccessToken();
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      console.error('Error refreshing access token:', refreshError);
      return Promise.reject(refreshError);
    }
  }
  return Promise.reject(error);
});

// Function to make an authenticated API call
export const fetchProtectedData = async () => {
  try {
    const response = await axiosInstance.get('/protected-route');
    console.log('Protected data fetched successfully.');
    return response.data;
  } catch (error) {
    console.error('Fetching protected data failed:', error.response?.data || error.message);
    throw error;
  }
};
export const checkEmail = async (email) => {
  try {
    const response = await axiosInstance.get(`/check-email/${email}`);
    console.error('Email checked:');
    // Directly return the API response for simplicity
    return response.data; // Adjust this line as needed based on your API structure
  } catch (error) {
    console.error('Email check failed:', error);
    throw error; // Rethrow the error to catch it in the form submission
  }
};

export const validateToken = async (token) => {
  try {
    // Assuming your backend has a token validation route
    const response = await axiosInstance.post('/validate-token', { token });
    return response.data; // Expected to return session data if valid
  } catch (error) {
    console.error('Token validation failed:', error);
    return null;
  }
};