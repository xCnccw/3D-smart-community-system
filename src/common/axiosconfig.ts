import axios from "axios";
import { getTokenCache } from "@/common/utils/auth";

/**
 * 引入环境变量接口地址
 */
const URL_HOST = import.meta.env.VITE_API_DOMAIN as string;

const PRINT_LOG: boolean = import.meta.env.VITE_LOG_PRINT == "true";

/*
  @ 创建自定义axios实例
*/
const instance = axios.create({
  baseURL: URL_HOST,
  headers: {},
  timeout: 15000 // 请求超时时间
});

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    const token = getTokenCache();
    config.headers.token = token; // Authorization
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    !PRINT_LOG || console.log(response.data);
    const { code, message } = response.data;
    if (code != 10000) {
      return Promise.reject(message);
    } else {
      return Promise.resolve(response.data);
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
