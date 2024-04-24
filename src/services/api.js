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

// Add a request interceptor to attach the token to every request
axiosInstance.interceptors.request.use(config => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
}, error => Promise.reject(error));

// Function to refresh the access token using the refreshToken
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  const response = await axiosInstance.post('/refresh-token', { refreshToken });
  localStorage.setItem('accessToken', response.data.access_token);
  localStorage.setItem('refreshToken', response.data.refresh_token);
  return response.data.access_token;
};

// Response interceptor to refresh token on 401 response
axiosInstance.interceptors.response.use(response => response, async error => {
  const originalRequest = error.config;
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const newAccessToken = await refreshAccessToken();
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      // Handle failed refresh here (e.g., logout the user, redirect to login)
      console.error('Error refreshing access token:', refreshError);
      return Promise.reject(refreshError);
    }
  }
  // If not a token refresh issue, reject the promise with the error
  return Promise.reject(error);
});

export default axiosInstance;
