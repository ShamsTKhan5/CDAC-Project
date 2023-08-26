import axios from 'axios';

const API_URL = 'http://localhost:8080/admins'; // Assuming this is the correct endpoint for admin registration

const registerAdmin = (formData) => {
  return axios.post(API_URL, formData);
};

export default registerAdmin; // Keep this as the default export
