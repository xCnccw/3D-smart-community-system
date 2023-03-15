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