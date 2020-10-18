/*
 *用户个人中心路由组件
 */
import React, {Component} from "react"

import {Result, List, WhiteSpace, Button, Modal, Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import {resetUser} from "../../../redux/actions/user"

const Item = List.Item
const Brief = Item.Brief

class Personal extends Component {

    handleLogout = () => {
        Modal.alert('退出', '确认退出登录吗?', [
            {
                text: '取消',
                onPress: () => Toast.info('取消退出登录', 1)
            },
            {
                text: '确认',
                onPress: () => {
                    // 清除 storage中的token
                    localStorage.removeItem('X-TOKEN')
                    // 重置 redux 中的 user 状态
                    console.log(this.props)
                    this.props.resetUser()
                }
            }
        ])
    }

    render() {
        const {username, header, post, info, salary, company} = this.props.user
        return (
            <div style={{marginTop: 50}}>
                <Result
                    img={<img src={require(`../../../assets/images/headers/${header}.png`)} style={{
                        width:
                            50
                    }} alt="header"/>}
                    title={username}
                    message={company}
                />
                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                        <Brief>职位: {post}</Brief>
                        <Brief>简介: {info}</Brief>
                        {salary ? <Brief>薪资: {salary}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Button onClick={this.handleLogout} type='warning'>退出登录</Button>
                </List>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {resetUser}
)(Personal)