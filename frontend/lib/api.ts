import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3007/api";

const api = axios.create({
  baseURL: API_URL
});

// Add a request interceptor to include the auth token in headers
api.interceptors.response.use((config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
});

// Handle token expiration and refresh
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;