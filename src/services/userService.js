
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get access token from localStorage
const getAccessToken = () => localStorage.getItem('accessToken');

// Set the AUTH token for any request
axiosInstance.interceptors.request.use(function (config) {
  const token = getAccessToken();
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get('/users');
    return response.data;
  } catch (error) {
    console.error('Fetching users failed:', error.response?.data || error.message);
    throw error;
  }
};

export const getcustomers = async () => {
  try {
    const response = await axiosInstance.get('/customers');
    return response.data;
  } catch (error) {
    console.error('Fetching users failed:', error.response?.data || error.message);
    throw error;
  }
};
export const getUser = async (id) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Fetching user failed:', error.response?.data || error.message);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axiosInstance.patch(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Updating user failed:', error.response?.data || error.message);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Creating user failed:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data; // or just return response.status === 204 to confirm deletion
  } catch (error) {
    console.error('Deleting user failed:', error.response?.data || error.message);
    throw error;
  }
};
