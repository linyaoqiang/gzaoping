import React, {Component} from "react"
import {Switch, Route} from 'react-router-dom'
import BossInfo from './boss-info'
import WorkerInfo from './worker-info/index'
import Boss from "./boss"
import Worker from "./worker"
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getInfo} from '../../redux/actions/user'
import {getRedirectPath} from "../../utils"
import {NavBar} from "antd-mobile"

import Message from "./message"
import Personal from "./personal"
import NavFooter from "../../components/nav-footer"
import NotFound from "./not-found"
import Chat from "../chat"

class Main extends Component {
    // 组件类和组件对象
// 给组件对象添加属性
    navList = [
        {
            path: '/boss', // 路由路径
            component: Boss,
            title: '大神列表',
            icon: 'dashen',
            text: '大神',
        },
        {
            path: '/worker', // 路由路径
            component: Worker,
            title: '老板列表',
            icon: 'laoban',
            text: '老板',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息'
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]

    render() {
        const {user, location, getInfo} = this.props
        const {_id, header} = user
        const token = localStorage.getItem('X-TOKEN')
        const pathname = location.pathname
        if (!token) {
            return <Redirect to={'/login'}/>
        } else if (!_id) {
            getInfo()
            return null
        } else if (pathname === '/') {
            return <Redirect to={getRedirectPath(user)}/>
        } else if (!header) {
            return <Redirect to={getRedirectPath(user)}/>
        }

        if (user.type === 'boss') {
            this.navList[1].hide = true
        } else {
            this.navList[0].hide = true
        }
        // 得到当前的 nav
        const currentNav = this.navList.find(nav => nav.path === pathname)
        return (
            <div>
                {currentNav ? <NavBar className='stick-top'>{currentNav.title}</NavBar> : null}
                <Switch>
                    <Route path='/boss-info' component={BossInfo}/>
                    <Route path='/worker-info' component={WorkerInfo}/>
                    {
                        this.navList.map((item, index) => {
                            return <Route key={index} path={item.path} component={item.component}/>
                        })
                    }
                    <Route path='/chat/:id' component={Chat}/>
                    <Route component={NotFound}/>
                </Switch>
                {currentNav ? <NavFooter unReadCount={this.props.unReadCount} navList={this.navList}/> : null}
            </div>
        )
    }

}

export default connect(
    state => ({user: state.user}),
    {getInfo}
)(Main)