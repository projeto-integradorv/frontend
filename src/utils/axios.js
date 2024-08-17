'use client';
import axios from 'axios';

import { HOST_API } from '@/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create(
    { 
        baseURL: HOST_API,
        headers: {
            'Content-Type': 'application/json',   
            'Authorization': `Token 3836735c2f9d8993f29c2c0eaa5ce2f585283d3d`
        }
    }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

