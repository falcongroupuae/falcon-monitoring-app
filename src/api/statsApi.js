import axiosInstance from "./axiosInstance";

export const getAppsHeatmap = (params) => {
  return axiosInstance.get("/stats/heatmap/apps", { params });
};

export const getTitlesHeatmap = (params = {}) => {
  return axiosInstance.get("/stats/heatmap/titles", { params });
};

export const getDepartmentProductivity = (params = {}) => {
  return axiosInstance.get("/stats/department-productivity", { params });
};
