import $axios from "./axios.js";

export const getChartsList = (params) => {
  console.log(params, 6666);
  return $axios.post(`/api/raycharts/list`, params);
};

export const updateCharts = (params) => {
  console.log(params, 6666);
  return $axios.post(`/api/raycharts/update`, params);
};

export const getbarChartsList = (params) => {
  console.log(params, 6666);
  return $axios.post(`/api/barcharts/list`, params);
};

export const updatebarCharts = (params) => {
  console.log(params, 6666);
  return $axios.post(`/api/barcharts/update`, params);
};

export const getBDdetailsList = (params) => {
  console.log(params, 9999);
  return $axios.post(`/api/buildingdetails/list`, params);
};

export const updateBDdetails = (params) => {
  console.log(params, "建筑状态参数");
  return $axios.post(`/api/buildingdetails/update`, params);
};
