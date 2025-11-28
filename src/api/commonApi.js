import axiosInstance from "./axiosInstance";


export const getMetaDepartments = (params) =>
  axiosInstance.get("/stats/departments", { params });

export const getMetaUsers = (params) =>
  axiosInstance.get("/stats/users", { params });