import axiosInstance from "./axiosInstance";

export const exportCSV = async (params) => {
  return axiosInstance.get("/export/csv", {
    params,
    responseType: "blob",
  });
};
