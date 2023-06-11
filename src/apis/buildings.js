import $axios from './axios.js';

export const getBuildingsList = (params) => {
    return $axios.post(`/api/buildings/list`, params);
};

export const deleteBuildings = (params) => {
    return $axios.post(`/api/buildings/delete`, params);
};

export const addBuildings = (params) => {
    return $axios.post(`/api/buildings/add`, params);
};

export const updateBuildings = (params) => {
    return $axios.post(`/api/buildings/update`, params);
};


