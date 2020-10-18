import ioClient from 'socket.io-client'
import actionTypes from '../action-types'
import {reqMessageList, reqReadChatMessage} from '../../api/chat'
import {refreshToken, errorHandler} from './index'

const {RECEIVE_MSG_LIST, RECEIVE_MSG, READ_MSG} = actionTypes

/**
 * 定义接收用户所有消息的列表的同步action
 * @param chatData {users,messageList,_id} 用户列表
 * @returns {{}}
 */
export const receiveMessageList = (chatData) => ({type: RECEIVE_MSG_LIST, data: chatData})

/**
 * 接收一条消息的同步action
 * @param msg 消息
 * @param isToMe   是否发送给我
 * @returns {{data: {msg: *, isToMe: *}, type: *}}
 */
export const receiveMsg = (msg, isToMe) => ({type: RECEIVE_MSG, data: {msg, isToMe}})

/**
 * 读取了的消息数的同步action
 * @param from 发送方
 * @param to   接收方
 * @param count 数目
 * @returns {{data: {count: *, from: *, to: *}, type: *}}
 */
export const readMsg = (from, to, count) => ({type: READ_MSG, data: {from, to, count}})


function initIO(dispatch, _id) {
    if (!ioClient.socket) {
        ioClient.socket = ioClient('ws://localhost:4000')
        ioClient.socket.on('receiveMessage', (chatMsg) => {
            if (chatMsg.from === _id || chatMsg.to === _id) {
                dispatch(receiveMsg(chatMsg, chatMsg.to === _id))
            }
        })
    }
}

/*获取当前用户相关的所有聊天消息列表
(在注册/登陆/获取用户信息成功后调用)
*/
async function getMsgList(dispatch, _id) {
    try {
        initIO(dispatch, _id)
        const response = await reqMessageList()
        const {messageList, users} = response.data
        dispatch(reqMessageList({messageList, users, _id}))
        refreshToken(response.token)
    } catch (e) {
        errorHandler(e, dispatch)
    }
}

/*
 *发送消息的异步 action
 */
export const sendMsg = ({from, to, content}) => {
    return async dispatch => {
        ioClient.socket.emit('sendMessage', {from, to, content})
    }
}

/*
   更新读取消息的异步 action
*/
export const readMsgAsync = (_id) => {
    return async (dispatch, getState) => {
        const response = await reqReadChatMessage(_id)
        const result = response.data
        if (result.code === 0) {
            const count = result.data
            const from = _id
            const to = getState().user._id
            dispatch(readMsg(from, to, count))
        }
    }
}

getMsgList()
