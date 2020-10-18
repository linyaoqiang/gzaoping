import React from "react"
import logo from '../../assets/images/logo.png'
import './index.less'

export default function Logo(props) {
    return (
        <div className='logo-container'>
            <img src={logo} alt="硅谷直聘" className='logo-img'/>
        </div>
    )
}