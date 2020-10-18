import React, {Component} from "react"
import {getRedirectPath} from "../../../utils"
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchUserList} from "../../../redux/actions/user"
import PropTypes from 'prop-types'
import UserList from "../../../components/user-list"

class Worker extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired,
        fetchUserList: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.fetchUserList()
    }

    render() {
        const {location, user} = this.props
        const pathname = location.pathname
        const path = getRedirectPath(user)
        if (path !== pathname) {
            return <Redirect to={path}/>
        }
        return (
            <UserList userList={this.props.userList}/>
        )
    }
}

export default connect(
    state => ({user: state.user, userList: state.userList}),
    {fetchUserList}
)(Worker)