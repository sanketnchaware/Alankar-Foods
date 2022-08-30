import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;
const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

axiosInstance.defaults.withCredentials = true;

export default axiosInstance;