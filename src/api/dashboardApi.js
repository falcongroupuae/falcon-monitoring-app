import axiosInstance from "./axiosInstance";

export const getSummary = (params) =>
  axiosInstance.get("/stats/summary", { params });

export const getTopSites = (params) =>
  axiosInstance.get("/stats/top-sites", { params });

export const getTopApps = (params) =>
  axiosInstance.get("/stats/top-apps", { params });

export const getUserDaily = (params) =>
  axiosInstance.get("/stats/user-daily", { params });

export const getDepartmentSummary = (params) =>
  axiosInstance.get("/stats/department-summary", { params });

export const getLeastProductiveUsers = (params) =>
  axiosInstance.get("/stats/least-productive-users", { params });


export const getAgentSummary = () => axiosInstance.get("/agent-summary");
export const getIdleTime = () => axiosInstance.get("/idle-time");
export const getActivityTrend = () => axiosInstance.get("/activity-trend");
