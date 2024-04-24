import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Use your API base URL
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Assuming you're using the same mechanism to get the access token
const getAccessToken = () => localStorage.getItem('accessToken');

// Set the AUTH token for any request
axiosInstance.interceptors.request.use(function (config) {
  const token = getAccessToken();
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export const getCustomers = async () => {
  try {
    const response = await axiosInstance.get('/customers');
    return response.data;
  } catch (error) {
    console.error('Fetching customers failed:', error.response?.data || error.message);
    throw error;
  }
};

export const getCustomer = async (id) => {
  try {
    const response = await axiosInstance.get(`/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Fetching customer failed:', error.response?.data || error.message);
    throw error;
  }
};

export const updateCustomer = async (id, customerData) => {
  try {
    const response = await axiosInstance.patch(`/customers/${id}`, customerData);
    return response.data;
  } catch (error) {
    console.error('Updating customer failed:', error.response?.data || error.message);
    throw error;
  }
};

export const createCustomer = async (customerData) => {
  try {
    const response = await axiosInstance.post('/customers', customerData);
    return response.data;
  } catch (error) {
    console.error('Creating customer failed:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteCustomer = async (id) => {
  try {
    const response = await axiosInstance.delete(`/customers/${id}`);
    return response.data; // or just return response.status === 204 to confirm deletion
  } catch (error) {
    console.error('Deleting customer failed:', error.response?.data || error.message);
    throw error;
  }
};
