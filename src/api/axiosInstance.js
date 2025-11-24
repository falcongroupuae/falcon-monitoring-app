import axios from "axios";
import { delay } from "../utils/delay";

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.205:8090",
  headers: {
    "Content-Type": "application/json",
  },
});

// -------- Artificial delay for testing loading states --------
// Only active in DEV mode to avoid slowing production
axiosInstance.interceptors.response.use(
  async (response) => {
    if (import.meta.env.DEV) {
      await delay(1000);
    }
    return response;
  },
  async (error) => {
    if (import.meta.env.DEV) {
      await delay(700);
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use((config) => {
  const token = "supers3cr3ttoken";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
