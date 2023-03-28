// import $axios from './axios.js';
// //登录
// export const getUmsList = (params) => {
//     return $axios({
//         url: "/admin/list",
//         method: "post",
//         data: params
//     })
// };
import request from "@/common/axiosconfig"

export const getUmsList = (params) => {
  return request({
    url: "/admin/list",
    method: "post",
    data: params
  })
}

export const deleteUser = (params) => {
  return request({
    url: "/admin/delete",
    method: "post",
    data: params
  })
}

export const updateUser = (params) => {
  return request({
    url: "/admin/update",
    method: "post",
    data: params
  })
}

export const addUser = (params) => {
  return request({
    url: "/admin/add",
    method: "post",
    data: params
  })
}