import request from "../utils/request"


export const reqLogin = (user) => {
    return request({
        url: '/user/login',
        method: 'post',
        data: user
    })
}

export const reqRegister = (user) => {
    return request({
        url: '/user/register',
        method: 'post',
        data: user
    })
}

export const reqUpdate = (userInfo) => {
    return request({
        url: '/user/update',
        method: 'put',
        data: userInfo
    })
}

export const reqGet = () => {
    return request({
        url: '/user/get',
        method: 'get'
    })
}

export const reqUserList = () => {
    return request({
        url: '/user/list',
        method: 'get'
    })
}