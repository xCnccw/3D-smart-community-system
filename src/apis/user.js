import $axios from './axios.js';
//获取用户列表
export const getUserList = (params) => {
  return $axios.post(`/api/admin/list`, params);
};

export const deleteUser = (params) => {
  return $axios.post(`/api/admin/delete`, params);
};

export const addUser = (params) => {
  return $axios.post(`/api/admin/add`, params);
};

export const updateUser = (params) => {
  return $axios.post(`/api/admin/update`, params);
};

export const updatePwd = (params) => {
  return $axios.post(`/api/admin/pwd`, params);
};

