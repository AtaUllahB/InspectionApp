
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

export const getinspections = async () => {
  try {
    const response = await axiosInstance.get('/inspections');
    return response.data;
  } catch (error) {
    console.error('Fetching users failed:', error.response?.data || error.message);
    throw error;
  }
};

export const getInspectionDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/inspection-details/${id}`);
    return response.data;
  } catch (error) {
    console.error('Fetching inspection details failed:', error.response?.data || error.message);
    throw error;
  }
};
export const getInspectionDetailsStructured = async (id) => {
  try {
    const response = await axiosInstance.get(`/inspection-details-structured/${id}`);
    return response.data;
  } catch (error) {
    console.error('Fetching inspection details failed:', error.response?.data || error.message);
    throw error;
  }
};

export const getInspectionDetailsReport = async (id) => {
  try {
    const response = await axiosInstance.get(`/quality-points-report/${id}`);
    return response.data;
  } catch (error) {
    console.error('Fetching inspection details failed:', error.response?.data || error.message);
    throw error;
  }
};
export const getReportInfo = async (id) => {
  try {
    const response = await axiosInstance.get(`/customer-info-report/${id}`);
    return response.data;
  } catch (error) {
    console.error('Fetching inspection details failed:', error.response?.data || error.message);
    throw error;
  }
};

export const getInspectionSummaries = async () => {
  try {
    const response = await axiosInstance.get(`/api/inpsections/summary`);
    return response.data;
  } catch (error) {
    console.error('Fetching inspection summary failed:', error.response?.data || error.message);
    throw error;
  }
};

export const inpsectionPointSummary= async () => {
  try {
    const response = await axiosInstance.get(`/api/inpsection-points/summary`);
    return response.data;
  } catch (error) {
    console.error('Fetching inspection summary failed:', error.response?.data || error.message);
    throw error;
  }
};


export const missingPointSummary= async () => {
  try {
    const response = await axiosInstance.get(`/api/missing-points/summary`);
    return response.data;
  } catch (error) {
    console.error('Fetching inspection summary failed:', error.response?.data || error.message);
    throw error;
  }
};

export const countsSummary= async () => {
  try {
    const response = await axiosInstance.get(`/api/inspection-count/summary`);
    return response.data;
  } catch (error) {
    console.error('Fetching inspection summary failed:', error.response?.data || error.message);
    throw error;
  }
};


export const patchInspectionDetails = async (id, dataToUpdate) => {
  try {
    // Create a FormData object to hold the file and other form data
    console.log("the image in pacth request to update",dataToUpdate.img_addr);
    const formData = new FormData();

    formData.append('img_addr', dataToUpdate.img_addr); // assuming this is a File object
    formData.append('status', dataToUpdate.status);
    formData.append('count', dataToUpdate.count);
    console.log(id, formData, dataToUpdate, formData!=null)
    if(formData!=null){
      const response = await axiosInstance.patch(`/inspection-details/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // required header for file upload
        },
      });
      console.log(response)
      return response.data;
    }
    else{
      const response = await axiosInstance.patch(`/inspection-details/${id}`);
      return response.data;

    }   
  } catch (error) {
    console.error('Fetching inspection details failed:', error.response?.data || error.message);
    throw error;
  }
};


export const getResourceImage = async (resourceId) => {
  try {
    const response = await axiosInstance.get(`/resources/${resourceId}.png`, { responseType: 'blob' });
    // Convert the blob to a URL object which can be used in <img> src
    const imageObjectURL = URL.createObjectURL(response.data);
    return imageObjectURL;
  } catch (error) {
    console.error('Fetching resource image failed:', error.response?.data || error.message);
    throw error;
  }
};
