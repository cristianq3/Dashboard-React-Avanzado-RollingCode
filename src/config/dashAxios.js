import axios from 'axios';


export const dashAxios = axios.create({
    baseURL: import.meta.env.VITE_API_BACKEND,
    timeout: 12000,
});
dashAxios.interceptors.request.use( config  => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('tokenAuth'),
        'Content-Type': 'multipart/form-data'
    }
    return  config;
});