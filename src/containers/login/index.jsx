import React, {Component} from "react"
import {connect} from 'react-redux'
import {
    NavBar,
    List,
    Button,
    InputItem,
    WhiteSpace,
    WingBlank,
    Toast
} from 'antd-mobile'
import Logo from "../../components/logo"
import {login, getInfo} from '../../redux/actions/user'
import {Redirect} from 'react-router-dom'

class Login extends Component {
    state = {
        user: {
            username: '',
            password: ''
        }
    }
    login = () => {
        Toast.loading('登录中....')
        let {user} = this.state
        this.props.login(user)
    }
    toRegister = () => {
        this.props.history.replace('/register')
    }

    render() {
        const {redirectTo} = this.props
        const token = localStorage.getItem('X-TOKEN')

        if (redirectTo && token) {
            return <Redirect to={redirectTo}/>
        }
        let user = this.state.user
        return (
            <div>
                <NavBar type={"primary"}>硅谷直聘</NavBar>
                <WhiteSpace/>
                <WhiteSpace/>
                <Logo/>
                <WhiteSpace/>
                <WhiteSpace/>
                <WingBlank>
                    <List>
                        <WhiteSpace/>
                        <InputItem placeholder={'请输入用户名'} onChange={value => user.username = value}
                                   type={"text"}>用户名:</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder={'请输入密码'} onChange={value => user.password = value}
                                   type={"password"}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                    </List>
                </WingBlank>
                <WhiteSpace size={"xl"}/>
                <WhiteSpace size={"xl"}/>
                <WingBlank>
                    <Button type={"primary"} onClick={this.login}>登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.toRegister}>还没有账号?</Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => state.user,
    {login, getInfo}
)(Login)