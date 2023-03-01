import $axios from './axios.js';
//登录
export const loginApi = (params) => {
    return $axios.post(`/ndm/login`, params);
  };