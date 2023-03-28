import $axios from './axios.js';

export const getCarsList = (params) => {
    console.log(params, 6666);
    return $axios.post(`/api/cars/list`, params);
};

export const deleteCars = (params) => {
    console.log(params, 6666);
    return $axios.post(`/api/cars/delete`, params);
};

export const addCars = (params) => {
    console.log(params, 6666);
    return $axios.post(`/api/cars/add`, params);
};

export const updateCars = (params) => {
    console.log(params, 6666);
    return $axios.post(`/api/cars/update`, params);
};


