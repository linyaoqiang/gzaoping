import actionTypes from '../action-types'
import {Toast} from 'antd-mobile'
import {getRedirectPath} from '../../utils'

const {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER,RESET_USER} = actionTypes
const INIT_USER = {
    username: '',
    type: '',
    msg: ''
}

export default function user(state = INIT_USER, action) {
    let resultState = null
    switch (action.type) {
        case AUTH_SUCCESS:
            resultState = action.data.user
            localStorage.setItem('X-TOKEN', action.data.token)
            resultState.redirectTo = getRedirectPath(resultState)
            resultState.msg = action.data.msg
            Toast.success(resultState.msg)
            break
        case ERROR_MSG:
            resultState = {...state, msg: action.data}
            Toast.fail(resultState.msg)
            break
        case RECEIVE_USER:
            resultState = {...state, ...action.data}
            if (resultState.msg) {
                Toast.success(resultState.msg)
            }
            break
        case RESET_USER:
            resultState = {}
            break

        default:
            resultState = state
    }
    return resultState
}
