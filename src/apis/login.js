import $axios from './axios.js';
//登录
export const loginApi = (params) => {
  console.log(params,6666);
    return $axios.post(`/api/login`, params);
  };

  export const registerApi = (params) => {
    console.log(params,6666);
    return $axios.post(`/api/reguser`, params);
  };