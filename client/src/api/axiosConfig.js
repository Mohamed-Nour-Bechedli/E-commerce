import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/", 
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor 
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// handle global responses or errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // handle token expiration
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;