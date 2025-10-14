import axiosInstance from "./axiosInstance";

export const getSummary = () => axiosInstance.get("/summary");
export const getAgentSummary = () => axiosInstance.get("/agent-summary");
export const getTopApps = (limit = 10) => axiosInstance.get(`/top-apps?limit=${limit}`);
export const getTopSites = (limit = 10) => axiosInstance.get(`/top-sites?limit=${limit}`);
export const getIdleTime = () => axiosInstance.get("/idle-time");
export const getActivityTrend = () => axiosInstance.get("/activity-trend");
