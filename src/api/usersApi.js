import axiosInstance from "./axiosInstance";

export const getUsers = (filters = {}) =>
  axiosInstance.get("/stats/users", { params: filters });

export const getUserProductivity = (agent_code, filters = {}) => {
  return axiosInstance.get("/stats/user-productivity", {
    params: { agent_code, ...filters },
  });
};

export const getUserOverview = (
  agent_code_or_filters = {},
  maybeFilters = {}
) => {
  let params = {};

  // ✅ Case 1: Single user call
  // getUserOverview("DESKTOP-00-64")
  if (typeof agent_code_or_filters === "string") {
    params = { agent_code: agent_code_or_filters };
  }

  // ✅ Case 2: Filtered list call
  // getUserOverview({ start_date, end_date, department, agent_code })
  else if (typeof agent_code_or_filters === "object") {
    params = agent_code_or_filters;
  }

  // ✅ Case 3: Backward-compatible mixed usage
  // getUserOverview(agent_code, { start_date, end_date })
  if (typeof maybeFilters === "object" && Object.keys(maybeFilters).length) {
    params = { ...params, ...maybeFilters };
  }

  return axiosInstance.get("/stats/user-overview", {
    params,
  });
};

export const getAllUserOverview = (filters = {}) =>
  axiosInstance.get("/stats/user-overview", {
    params: filters,
  });

export const getUserDailySitesApps = (filters = {}) => {
  return axiosInstance.get("/stats/user-daily-sites-apps", {
    params: {
      site_limit: 10,
      app_limit: 10,
      ...filters,
    },
  });
};
