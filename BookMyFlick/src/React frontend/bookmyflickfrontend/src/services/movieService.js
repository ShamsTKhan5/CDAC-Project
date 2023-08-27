import axios from 'axios';

const API_URL = 'http://localhost:8080/movies'; // Set the backend API URL for movies

const addMovie = (formData) => {
  return axios.post(`${API_URL}`, formData);
};

const getAllMovies = () => {
  return axios.get(`${API_URL}`);
};

export default { addMovie, getAllMovies }; 
