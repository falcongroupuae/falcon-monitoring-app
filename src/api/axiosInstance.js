import axios from "axios";
import { delay } from "../utils/delay";

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.205:8060",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  // ✅ DO NOT attach token to login
  if (token && !config.url.includes("/auth/login")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  async (response) => {
    if (import.meta.env.DEV) await delay(800);
    return response;
  },
  async (error) => {
    if (import.meta.env.DEV) await delay(600);
    return Promise.reject(error);
  }
);

export default axiosInstance;
