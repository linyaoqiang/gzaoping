import actionTypes from "../action-types"
const {RECEIVE_USER_LIST} = actionTypes
const initUserList = []

export default function (state = initUserList, action) {
    let resultState
    switch (action.type) {
        case RECEIVE_USER_LIST:
            resultState = action.data
            break
        default:
            resultState = state
    }
    return resultState
}