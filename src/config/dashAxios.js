import axios from 'axios';


export const dashAxios = axios.create({
    // tomo el puerto que está en la bd de ariel
    baseURL: 'http://localhost:4000/api/',
    timeout: 12000,
    headers: {

    }
});