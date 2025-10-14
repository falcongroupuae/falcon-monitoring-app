import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.205:8070/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = "supers3cr3ttoken";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
