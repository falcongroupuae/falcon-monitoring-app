import axiosInstance from "./axiosInstance";

export const getUsers = (filters = {}) =>
  axiosInstance.get("/stats/users", { params: filters });

export const getUserProductivity = (agent_code, filters = {}) => {
  return axiosInstance.get("/stats/user-productivity", {
    params: { agent_code, ...filters },
  });
}

export const getUserOverview = (agent_code, filters = {}) =>
  axiosInstance.get("/stats/user-overview", {
    params: { agent_code, ...filters },
  });


  export const getAllUserOverview = (filters = {}) =>
  axiosInstance.get("/stats/user-overview", {
    params: filters,
  });
