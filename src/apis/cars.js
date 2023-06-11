import $axios from './axios.js';

export const getCarsList = (params) => {
    return $axios.post(`/api/cars/list`, params);
};

export const deleteCars = (params) => {
    return $axios.post(`/api/cars/delete`, params);
};

export const addCars = (params) => {
    return $axios.post(`/api/cars/add`, params);
};

export const updateCars = (params) => {
    return $axios.post(`/api/cars/update`, params);
};


