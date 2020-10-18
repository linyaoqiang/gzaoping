import React, {Component} from "react"
import {connect} from 'react-redux'
import {Button, InputItem, NavBar, TextareaItem, WhiteSpace} from "antd-mobile"
import HeaderSelector from "../../../components/header-selector"
import {update} from "../../../redux/actions/user"
import {getRedirectPath} from "../../../utils"
import {Redirect} from 'react-router-dom'

class WorkerInfo extends Component {
    state = {
        header: '', //头 像 名 称
        post: '', //职 位
        info: '', //个 人 或 职 位 简 介
    }

    update = () => {
        this.props.update('worker', this.state)
    }

    changeValue = (name, value) => {
        this.setState({[name]: value})
    }

    setHeader = (header) => {
        this.changeValue('header', header)
    }

    render() {
        const {location, user} = this.props
        const pathname = location.pathname
        const path = getRedirectPath(user)
        if (path !== pathname) {
            return <Redirect to={path}/>
        }
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <WhiteSpace size={'xl'}/>
                <InputItem onChange={value => this.changeValue('post', value)}>求职岗位:</InputItem>
                <TextareaItem title={'个人简介:'}
                              rows={3}
                              onChange={val => this.changeValue('info', val)}>

                </TextareaItem>
                <WhiteSpace size={'xl'}/>
                <Button type={"primary"} onClick={this.update}>保存</Button>
            </div>
        )
    }
}


export default connect(
    state => ({user: state.user}),
    {update}
)(WorkerInfo)