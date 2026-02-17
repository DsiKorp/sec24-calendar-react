import axios from "axios";

const calendarApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Interceptors
// use (middleware): Function that executes every time this request is processed 
calendarApi.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.set('x-token', token);
    }

    return config;
})

export default calendarApi;
//export { calendarApi };