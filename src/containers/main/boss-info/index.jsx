import React, {Component} from "react"
import {connect} from 'react-redux'
import {
    NavBar,
    InputItem,
    TextareaItem,
    WhiteSpace,
    Button,
    Toast
} from 'antd-mobile'
import HeaderSelector from "../../../components/header-selector"
import {update} from '../../../redux/actions/user'
import {getRedirectPath} from "../../../utils"
import {Redirect} from 'react-router-dom'

class BossInfo extends Component {
    state = {
        header: '', //头 像 名 称
        post: '', //职 位
        info: '', //个 人 或 职 位 简 介
        company: '', // 公 司 名 称
        salary: '' // 工 资
    }

    update = () => {
        Toast.loading('更新完善信息中...')
        this.props.update('boss', this.state)
    }

    changeValue = (name, value) => {
        let newState = {}
        newState[name] = value
        this.setState(newState)
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
                <NavBar>老板信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <WhiteSpace size={'xl'}/>
                <InputItem onChange={value => this.changeValue('post', value)}>招聘职位:</InputItem>
                <InputItem onChange={value => this.changeValue('company', value)}>公司名称:</InputItem>
                <InputItem onChange={value => this.changeValue('salary', value)}>职位薪资:</InputItem>
                <TextareaItem title={'职位要求:'}
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
)(BossInfo)