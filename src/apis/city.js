import $axios from './axios.js';
//获取
export const buildingDetail = () => {
  console.log('buildingDetail');
  return $axios.post(`/api/buildingdetails/list`, );
};

