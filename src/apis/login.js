import $axios from './axios.js';
//登录
export const loginApi = (params) => {
    return $axios.post(`/api/login`, params);
  };

  export const registerApi = (params) => {
    return $axios.post(`/api/reguser`, params);
  };