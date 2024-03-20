import axios from 'axios';

import { HOST_API } from '@/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create(
    { 
        baseURL: HOST_API,
        headers: {
            'Content-Type': 'application/json',
        }
    }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

