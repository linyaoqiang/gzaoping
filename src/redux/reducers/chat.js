import actionTypes from '../action-types'

const {RECEIVE_MSG_LIST, READ_MSG, RECEIVE_MSG} = actionTypes

const initChat = {
    chatMsgs: [], // 消息数组 [{from: id1, to: id2}{}]
    users: {}, // 所有用户的集合对象{id1: user1, id2: user2}
    unReadCount: 0 // 未读消息的数量
}

export default function chat(state = initChat, action) {
    let resultState
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            const {messageList, users, _id} = action.data
            resultState = {
                charMsgs: messageList,
                users,
                unReadCount: messageList.reduce((preTotal, msg) => { // 别人发给我的未读消息
                    return preTotal + (!msg.read && msg.to === _id ? 1 : 0)
                }, 0)
            }
            break
        case RECEIVE_MSG:
            const {msg, isToMe} = action.data
            resultState = {
                charMsgs: [...state.chatMsgs, msg],
                users: state.users,
                unReadCount: state.unReadCount += isToMe ? 1 : 0
            }
            break
        case READ_MSG:
            const {count, from, to} = action.data
            resultState = {
                chatMsgs: state.chatMsgs.map(msg => {
                    if (msg.from === from && msg.to === to && !msg.read) {
                        // msg.read = true // 不能直接修改状态
                        return {...msg, read: true}
                    } else {
                        return msg
                    }
                }),
                users: state.users,
                unReadCount: state.unReadCount - count
            }
            break
        default:
            resultState = state
    }
    return resultState
}