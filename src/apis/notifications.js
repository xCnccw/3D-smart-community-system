import $axios from './axios.js';
//获取
export const notificationsList = () => {
  console.log('notifications');
  return $axios.post(`/api/notifications/list`, );
};

