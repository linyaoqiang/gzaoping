import actionTypes from '../action-types'
import {reqLogin, reqRegister, reqUpdate, reqGet, reqUserList} from '../../api/user'
import {refreshToken, errorHandler} from './index'

const userReg = /^\w{6,}$/
const {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST} = actionTypes
/**
 * 定义用户相关Action
 */
/**
 * 定义注册或者登录成功的同步Action
 */
export const authSuccess = user => ({type: AUTH_SUCCESS, data: user})
export const errorMsg = msg => ({type: ERROR_MSG, data: msg})

/**
 * 定义注册的异步Action
 */
export const register = user => {
    /**
     * 表单的前台验证
     */
    const {username, password, rePassword, type} = user

    // 验证两次密码是否一致
    if (password !== rePassword) {
        return errorMsg('密码与确认密码不一致')
    }
    if (!userReg.test(username) || !userReg.test(password)) {
        return errorMsg('用户密码必须符合规范，必须是6位以上的数字，字母，下划线')
    }
    if (type !== 'worker' && type !== 'boss') {
        return errorMsg('用户类型不对，必须是大神或者老板')
    }
    // 进行注册
    return async dispatch => {
        try {
            const response = await reqRegister(user)
            let data = response.data
            data.msg = response.msg
            dispatch(authSuccess(data))
        } catch (e) {
            console.log(e)
            if (e.msg) {
                dispatch(errorMsg(e.msg))
            } else {
                dispatch(errorMsg('服务器繁忙，请稍后重试'))
            }
        }
    }
}
// 登录的同步或者异步action
export const login = user => {
    /**
     * 前端验证
     */
    const {username, password} = user
    // 判断用户名等消息是否规范
    if (!userReg.test(username) || !userReg.test(password)) {
        return errorMsg('用户密码必须符合规范，必须是6位以上的数字，字母，下划线')
    }

    return async dispatch => {
        try {
            const response = await reqLogin(user)
            let data = response.data
            data.msg = response.msg
            dispatch(authSuccess(data))
        } catch (e) {
            if (e.msg) {
                dispatch(errorMsg(e.msg))
            } else {
                dispatch(errorMsg('服务器繁忙，请稍后重试'))
            }
        }
    }
}

// 接收用户的同步action
export const receiveUser = (userInfo) => ({type: RECEIVE_USER, data: userInfo})

// 更新用户个人的信息的同步或者异步action
export const update = (type, userInfo) => {
    const {header, post, info, company, salary} = userInfo
    if (!header || !post || !info) {
        return errorMsg('用户信息不全')
    }
    if ((type !== 'boss' && type !== 'worker') || (type === 'boss' && (!company || !salary))) {
        return errorMsg('用户类型无效，或者是用户是老板类型，但是没有完成相关简介')
    }

    return async dispatch => {
        try {
            const response = await reqUpdate(userInfo)
            let data = response.data
            data.msg = response.msg
            dispatch(receiveUser(data))
            refreshToken(response.token)
        } catch (e) {
            errorHandler(e, dispatch)
        }
    }
}

// 获取用户个人信息的action
export const getInfo = (() => {
    return async dispatch => {
        try {
            const response = await reqGet()
            dispatch(receiveUser(response.data))
            refreshToken(response.token)
        } catch (e) {
            errorHandler(e, dispatch)
        }

    }
})
// 重置用户的同步action
export const resetUser = () => ({type: RESET_USER})
// 接收用户信息的同步action
export const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})

// 获取用户列表的异步action
export const fetchUserList = () => {
    return async dispatch => {
        try {
            const response = await reqUserList()
            dispatch(receiveUserList(response.data))
            refreshToken(response.token)
        } catch (e) {
            errorHandler(e, dispatch)
        }
    }
}