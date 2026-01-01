import axios from 'axios';

// Create an axios instance with the base URL
const axiosPublic = axios.create({
  baseURL: 'https://project.globalknowledgetech.com:5004',
});

export default axiosPublic;