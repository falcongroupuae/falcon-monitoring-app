import axiosInstance from "./axiosInstance";


export const getMetaDepartments = (params) =>
  axiosInstance.get("/meta/departments", { params });

export const getMetaUsers = (params) =>
  axiosInstance.get("/meta/users", { params });
