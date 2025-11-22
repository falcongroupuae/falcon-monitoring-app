import axiosInstance from "./axiosInstance";

export const getSummary = () => axiosInstance.get("/summary");
export const getTopSites = () => axiosInstance.get("/top-sites");
export const getTopApps = () => axiosInstance.get("/top-apps");
export const getUserDaily = () => axiosInstance.get("/user-daily");
export const getDepartmentSummary = () => axiosInstance.get("/department-summary");
export const getLeastProductiveUsers = () => axiosInstance.get("/least-productive-users");





export const getAgentSummary = () => axiosInstance.get("/agent-summary");
export const getIdleTime = () => axiosInstance.get("/idle-time");
export const getActivityTrend = () => axiosInstance.get("/activity-trend");
