import request from "../utils/request"

export const reqMessageList = () => {
    return request({
        url: '/chat/list',
        method: 'get'
    })
}
export const reqReadChatMessage = (from) => {
    return request({
        url: '/chat/read-m',
        method: 'put',
        data: {from}
    })
}