/*对话聊天的路由组件
*/
import React, {Component} from "react"
import {NavBar, List, InputItem, Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendMsg} from "../../redux/actions/chat"
import propTypes from 'prop-types'

const Item = List.Item

class Chat extends Component {
    static propTypes = {
        user: propTypes.object.isRequired,
        chat: propTypes.object.isRequired,
        sendMsg: propTypes.func.isRequired
    }

    /**
     * 更新消息时，自动拉倒最后面
     */
    componentDidMount() {
        // 初始显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }
    componentDidUpdate () {
        // 更新显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }

    state = {
        content: ''
    }

    submit = () => {
        let from = this.props.user._id
        let to = this.props.match.params.id
        const content = this.state.content
        this.props.sendMsg({from, to, content})

    }

    render() {
        const {user} = this.props
        const {chatMsgs, users} = this.props.chat
        const targetId = this.props.match.params.id
        if (!users[targetId]) {
            return null
        }
        const meId = user._id
        const chatId = [targetId, meId].sort().join('_')
        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)
        const targetIcon = users[targetId] ?
            require(`../../assets/images/headers/${users[targetId].header}.png`) : null

        return (
            <div id='chat-page'>
                <NavBar className='stick-top' icon={<Icon type='left'/>}
                        onLeftClick={() => this.props.history.goBack()}>aa</NavBar>
                <List>
                    {
                        msgs.map((item, index) => {
                            if (item.from === targetId) {
                                return <Item thumb={targetIcon}>item.content</Item>
                            } else {
                                return <Item className='chat-me' extra='我'>item.content</Item>
                            }
                        })
                    }
                </List>
                <div className='am-tab-bar'>
                    <InputItem
                        placeholder="请输入"
                        value={this.state.content}
                        onChange={value => this.setState({content: value})}
                        onClick={this.submit}
                        extra={
                            <span>发送</span>
                        }
                    />
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {sendMsg}
)(Chat)