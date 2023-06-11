import $axios from "./axios.js";

export const getnotificationsList = (params) => {
  return $axios.post(`/api/notifications/list`, params);
};

export const deletenotifications = (params) => {
  return $axios.post(`/api/notifications/delete`, params);
};

export const addnotifications = (params) => {
  return $axios.post(`/api/notifications/add`, params);
};

export const updatenotifications = (params) => {
  return $axios.post(`/api/notifications/update`, params);
};