import React, {Component} from "react"
import {connect} from 'react-redux'
import {register} from "../../redux/actions/user"
import {
    NavBar,
    List,
    Button,
    InputItem,
    WhiteSpace,
    WingBlank,
    Radio,
    Toast
} from 'antd-mobile'
import Logo from "../../components/logo"
import {Redirect} from 'react-router-dom'

const ListItem = List.Item

class Register extends Component {
    state = {
        user: {
            username: '',
            password: '',
            rePassword: '',
            type: 'boss'
        }
    }

    changeRegisterType = e => {
        let name = e.target.name
        let user = this.state.user
        user.type = name
        this.setState({user})
    }
    register = () => {
        Toast.loading('注册中....')
        this.props.register(this.state.user)
    }
    toLogin = () => {
        this.props.history.replace('/login')
    }

    render() {
        const redirectTo = this.props.redirectTo
        const token = localStorage.getItem('X-TOKEN')
        if (redirectTo && token) {
            return <Redirect to={redirectTo}/>
        }

        let user = this.state.user
        const TYPE_WORKER = 'worker'
        const TYPE_BOSS = 'boss'
        return (
            <div>
                <NavBar type={'primary'}>硅谷直聘</NavBar>
                <WhiteSpace/>
                <WhiteSpace/>
                <Logo/>
                <WhiteSpace/>
                <WhiteSpace/>
                <WingBlank>
                    <List>
                        <WhiteSpace/>
                        <InputItem placeholder={'请输入用户名'} type={"text"}
                                   onChange={value => user.username = value}>用户名:</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder={'请输入密码'} ref={(input) => this.password = input}
                                   onChange={value => user.password = value}
                                   type={"password"}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder={'请输入确认密码'} type={"password"}
                                   onChange={value => user.rePassword = value}>确认密码:</InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>注册类型:</span>

                            <Radio style={{marginLeft: '10px', marginRight: '10px'}}
                                   checked={user.type === TYPE_WORKER} name={TYPE_WORKER}
                                   onChange={this.changeRegisterType}>大神</Radio>
                            <Radio style={{marginLeft: '10px', marginRight: '10px'}}
                                   checked={user.type === TYPE_BOSS} name={TYPE_BOSS}
                                   onChange={this.changeRegisterType}>老板</Radio>
                        </ListItem>
                    </List>
                </WingBlank>
                <WhiteSpace/>
                <WhiteSpace/>
                <WingBlank>
                    <Button onClick={this.register} type={"primary"}>注册</Button>
                    <WhiteSpace/>
                    <Button onClick={this.toLogin}>已经有账号了?</Button>
                </WingBlank>

            </div>
        )
    }
}

export default connect(
    state => state.user,
    {register}
)(Register)