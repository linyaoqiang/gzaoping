/**
 *  入口JS文件
 */
import React from "react"
import ReactDOM from 'react-dom'
import {Switch, HashRouter, Route} from 'react-router-dom'
import Login from "./containers/login"
import Register from "./containers/register"
import Main from "./containers/main"
import {Provider} from "react-redux"
import store from "./redux/store"
import './assets/css/index.less'

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path={'/login'} component={Login}/>
                <Route path={'/register'} component={Register}/>
                <Route component={Main}/>
            </Switch>
        </HashRouter>
    </Provider>

), document.getElementById('root'))