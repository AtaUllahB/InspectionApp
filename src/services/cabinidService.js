import axiosInstance from './api'; // Assuming this is your configured Axios instance

export const submitCabinId = async (cabinId, unitType, customerId) => {
  try {
    const response = await axiosInstance.post('/unit-type', { cabin_id: cabinId , unit_type: unitType, customer_id: customerId});
    const data = response.data;

    // Assuming the response structure is as described
    const { id, unit_type } = data;

    // Storing id and unit_type in localStorage
    localStorage.setItem('Id', id.toString()); // Convert id to string for storage
    localStorage.setItem('unitType', unit_type);

    console.log('Data stored in localStorage:', { Id: id, unitType: unit_type });

    return data; // Return the response data in case it's needed for further processing
  } catch (error) {
    console.error('Error submitting cabin ID:', error);
    throw error; // Rethrow the error for handling by the caller
  }
};

export const fetchQualityPointsByUnitType = async (unitType) => {
  try {
    // Adjusting the URL to include unitType as part of the path
    const response = await axiosInstance.get(`/inspection-points/${unitType}`);
    console.log('Unit Type:', unitType);
    // Log and return the data as needed
    console.log('Quality points fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching quality points:', error);
    // Re-throw the error to handle it in the calling code, if necessary
    throw error;
  }
};


export const postInspectionDetails = async (inspectionDetails) => {
  console.log('Posting inspection details with image:', { inspectionDetails });
  // Create a FormData object to hold the file and other form data
  const formData = new FormData();
  formData.append('img_addr', inspectionDetails.img_addr); // assuming this is a File object
  formData.append('inspectionpoint_id', inspectionDetails.inspectionpoint_id);
  formData.append('inspection_id', inspectionDetails.inspection_id);
  formData.append('status', inspectionDetails.status);
  formData.append('count', inspectionDetails.count);
  
  try {
    const response = await axiosInstance.post('/inspection-details', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // required header for file upload
      },
    });

    console.log('Inspection details posted successfully:', response.data);
    return response.data; // return the response data for further processing if needed
  } catch (error) {
    console.error('Error posting inspection details:', error);
    throw error; // re-throw the error to be handled by the caller
  }
};