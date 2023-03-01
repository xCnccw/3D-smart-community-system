import Axios from 'axios';
import { ElMessage } from 'element-plus';
import store from '@/store/index';
import router from '@/router/index';

const baseURL = '';

const axios = Axios.create({
  baseURL,
  timeout: 20000, // 请求超时 20s
});

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  (config) => {
    config.headers['token'] = store.state.token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  (response) => {
    /**
     * 根据你的项目实际情况来对 response 和 error 做处理
     * 这里对 response 和 error 不做任何处理，直接返回
     */
    const { headers, data } = response;
    const { code } = response.data;
    const contentType = headers['content-type'];
    if (contentType.includes('force-download')) {
      let obj = {
        code: 200,
        data: { headers, data },
        message: '',
      };
      return obj;
    }

    if (code === 200) {
      return response.data;
    } else {
      return Promise.reject(response.data);
    }
  },
  (error) => {
    if (error.response && error.response.data) {
      const { code } = error.response.data;
      const status = error.response.status;
      const msg = error.response.data.message;
      ElMessage.error(`Code: ${status}, Message: ${msg}`);
      console.error(`[Axios Error]`, error.response);
      if (code === 401) {
        store.dispatch('userInfoActions', '');
        store.dispatch('tokenActions', '');
        return router.push('/loginPage');
      }
    } else {
      return ElMessage.error(`${error}`);
    }
    return Promise.reject(error);
  },
);

export default axios;