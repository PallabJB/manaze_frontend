import axios from 'axios';
import {BASE_URL} from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
         Accept: 'application/json',
    },
});

//ADD INTERCEPTORS FOR REQUESTS
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//RESPONSE INTERCEPTORS
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        //HANDLE COMMON ERROR GLOBALLY
        if(error.response){
            if(error.response.status === 401){
                //REDIRECT TO LOGIN PAGE IF UNAUTHORIZED
                window.location.href = '/login';
            }else if(error.response.status === 500){
                console.error('Server Error/Access forbidden. Please try again later.');
            }              
        }else if (error.code === 'ECONNABORATED'){
            console.log('Request timeout. Please try again later.');
        }
        return Promise.reject(error);
    }
);

//EXPORT THE AXIOS INSTANCE
export default axiosInstance;

