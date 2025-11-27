import axiosInstance from "./axiosInstance";

export const exportCSV = async (rawParams) => {
  const params = Object.fromEntries(
    Object.entries(rawParams).filter(
      ([_, value]) => value !== "" && value !== null && value !== undefined
    )
  );

  return axiosInstance.get("/export/csv", {
    params,
    responseType: "blob",
  });
};
