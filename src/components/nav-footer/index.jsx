import React, {Component} from "react"
import PropTypes from 'prop-types'
import {TabBar} from "antd-mobile"
import {withRouter} from 'react-router-dom'

const TabItem = TabBar.Item
class NavFooter extends Component {

    static propTypes = {
        navList: PropTypes.array.isRequired
    }

    render() {
        // nav.hide = true/false hide 代表当前项应该被隐藏
        const navList = this.props.navList.filter(nav => !nav.hide) // 回调函数返回值为 true, 当前元素就会留下, 否则不留
        // 当前请求的路径
        const pathname = this.props.location.pathname
        return (
            <TabBar>
                {
                    navList.map((nav, index) => (
                        <TabItem key={nav.path}
                                 title={nav.text}
                                 icon={{uri: require(`../../assets/images/nav/${nav.icon}.png`)}}
                                 selectedIcon={{uri: require(`../../assets/images/nav/${nav.icon}-selected.png`)}}
                                 selected={pathname === nav.path}
                                 onPress={() => {
                                     this.props.history.replace(nav.path)
                                 }}
                        />
                    ))
                }
            </TabBar>
        )
    }
}

export default withRouter(NavFooter) // 让非路由组件可以访问到路由组件的 API