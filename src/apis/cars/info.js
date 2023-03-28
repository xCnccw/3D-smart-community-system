import request from "@/common/axiosconfig"

export const getCarsList = (params) => {
    return request({
        url: "/cars/list",
        method: "post",
        data: params
    })
}

export const updateCars = (params) => {
    return request({
        url: "/cars/update",
        method: "post",
        data: params
    })
}

export const addCars = (params) => {
    return request({
        url: "/cars/add",
        method: "post",
        data: params
    })
}

export const deleteCars = (params) => {
    return request({
        url: "/cars/delete",
        method: "post",
        data: params
    })
}