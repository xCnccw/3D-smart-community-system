import $axios from './axios.js';

export const getBuildingsList = (params) => {
    console.log(params, 6666);
    return $axios.post(`/api/buildings/list`, params);
};

export const deleteBuildings = (params) => {
    console.log(params, 6666);
    return $axios.post(`/api/buildings/delete`, params);
};

export const addBuildings = (params) => {
    console.log(params, 6666);
    return $axios.post(`/api/buildings/add`, params);
};

export const updateBuildings = (params) => {
    console.log(params, 6666);
    return $axios.post(`/api/buildings/update`, params);
};


