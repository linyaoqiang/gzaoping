import user from "./user"
import userList from './user-list'
import chat from "./chat"
import {combineReducers} from 'redux'

/**
 * reducers汇聚模块，包含多个reducer函数
 * 传递的参数是一个对象，对象的键为reducer的属性名,值为reducer函数
 * 如下,封装成的state为 {
 *     xxx:0,
 *     yyy:0
 * }
 * 返回一个新的reducer函数
 */
export default combineReducers({user, userList, chat})
