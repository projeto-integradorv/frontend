'use client';
import axios from 'axios';

import { HOST_API } from '@/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create(
    { 
        baseURL: HOST_API,
        headers: {
            'Content-Type': 'application/json',   
            'Authorization': `Token 98c01c08bf0cc42f514007a8294a9306c1cdff2e`
        }
    }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

