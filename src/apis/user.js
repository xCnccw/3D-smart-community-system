import $axios from './axios.js';
//获取用户列表
export const getUserList = (params) => {
  console.log(params, 6666);
  return $axios.post(`/api/admin/list`, params);
};

export const deleteUser = (params) => {
  console.log(params, 6666);
  return $axios.post(`/api/admin/delete`, params);
};

export const addUser = (params) => {
  console.log(params, 6666);
  return $axios.post(`/api/admin/add`, params);
};

export const updateUser = (params) => {
  console.log(params, 6666);
  return $axios.post(`/api/admin/update`, params);
};

export const updatePwd = (params) => {
  console.log(params, 999);
  return $axios.post(`/api/admin/pwd`, params);
};

