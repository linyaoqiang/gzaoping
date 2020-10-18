/**
 *  定义用户相关的ActionType
 */
// 注册或者登录成功时的事假
export const AUTH_SUCCESS = 'auth_success'
// 错误信息
export const ERROR_MSG = 'error_msg'
// 接收新的用户的信息的action
export const RECEIVE_USER = 'receive_user'
// 重置用户状态
export const RESET_USER = 'reset_user'
// 获取用户列表 大神获取老板列表 老板获取大神列表
export const RECEIVE_USER_LIST = 'receive_user_list'