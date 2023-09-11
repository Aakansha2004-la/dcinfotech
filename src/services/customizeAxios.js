import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const instance = axios.create({
    baseURL: "http://localhost:8080"
})

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);


instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    if (
        error.response.status === 401
    ) {
        window.location.href = '/';
        localStorage.clear();
        return Promise.reject(error)
    }

    return Promise.reject(error);
});



export default instance;
// export { AxiosInterceptor }