import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// automatically add jwt tokens
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Skip adding Authorization for login/register
    const publicPaths = ['/login/', '/register/'];
    const isPublic = publicPaths.some(path => config.url?.endsWith(path));

    if (token && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);




export default axiosInstance;
