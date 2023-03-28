import $axios from './axios.js';

export const getChartsList = (params) => {
    console.log(params, 6666);
    return $axios.post(`/api/charts/list`, params);
};

// export const deleteCars = (params) => {
//     console.log(params, 6666);
//     return $axios.post(`/api/cars/delete`, params);
// };

// export const addCars = (params) => {
//     console.log(params, 6666);
//     return $axios.post(`/api/cars/add`, params);
// };

export const updateCharts = (params) => {
    console.log(params, 6666);
    return $axios.post(`/api/charts/update`, params);
};


