import $axios from "./axios.js";

export const getnotificationsList = (params) => {
  console.log(params, 8888);
  return $axios.post(`/api/notifications/list`, params);
};

export const deletenotifications = (params) => {
  console.log(params, 8888);
  return $axios.post(`/api/notifications/delete`, params);
};

export const addnotifications = (params) => {
  console.log(params, 8888);
  return $axios.post(`/api/notifications/add`, params);
};

export const updatenotifications = (params) => {
  console.log(params, 8888);
  return $axios.post(`/api/notifications/update`, params);
};