import {errorMsg} from './user'

export function refreshToken(responseToken) {
    if (responseToken) {
        localStorage.setItem('X-TOKEN', responseToken)
    }
}

export function errorHandler(e, dispatch) {
    if (e.msg) {
        dispatch(errorMsg(e.msg))
    } else {
        dispatch(errorMsg('服务器繁忙，请稍后重试'))
    }
    if (e.code === -301) {
        localStorage.removeItem('X-TOKEN')
    }
}