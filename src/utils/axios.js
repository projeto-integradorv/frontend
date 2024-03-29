import axios from 'axios';

import { HOST_API } from '@/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create(
    { 
        baseURL: HOST_API,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token 0be0a6499b1aaa2ae6fa7471bd428ffb1df1cdf0`
            
        }
    }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

