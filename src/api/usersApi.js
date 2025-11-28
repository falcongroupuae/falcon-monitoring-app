import axiosInstance from "./axiosInstance";

export const getUsers = (filters = {}) =>
  axiosInstance.get("/meta/users", { params: filters });

// export const getUserProductivity = (agent_code, filters = {}) => {
//   return axiosInstance.get("/stats/user-productivity", {
//     params: { agent_code, ...filters },
//   });
// };

export const getUserProductivity = (agent_code, filters = {}) => {
  return axiosInstance.get("/stats/user-productivity", {
    baseURL: "http://192.168.1.205:8060",
    params: { agent_code, ...filters },
  });
}

export const getUserOverview = (agent_code, filters = {}) =>
  axiosInstance.get("/stats/user-overview", {
        baseURL: "http://192.168.1.205:8060",
    params: { agent_code, ...filters },
  });
