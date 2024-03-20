import axiosInstance from '@/utils/axios';


export function getProductList() {
    console.log(axiosInstance)
  return axiosInstance.get('/product');
}