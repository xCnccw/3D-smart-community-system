import $axios from "./axios.js";

export const getChartsList = (params) => {
  return $axios.post(`/api/raycharts/list`, params);
};

export const updateCharts = (params) => {
  return $axios.post(`/api/raycharts/update`, params);
};

export const getbarChartsList = (params) => {
  return $axios.post(`/api/barcharts/list`, params);
};

export const updatebarCharts = (params) => {
  return $axios.post(`/api/barcharts/update`, params);
};

export const getBDdetailsList = (params) => {
  return $axios.post(`/api/buildingdetails/list`, params);
};

export const updateBDdetails = (params) => {
  return $axios.post(`/api/buildingdetails/update`, params);
};
