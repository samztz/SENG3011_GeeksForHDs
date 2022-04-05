import axios from 'axios';


const baseURL = 'http://13.52.98.118/';

const timeout = 30000;


export default function request(options) {
  const axiosInstance = axios.create({
      baseURL,
      timeout,
  });
  return axiosInstance(options)
      .then((response) => response)
      .catch((error) => error.response);
}