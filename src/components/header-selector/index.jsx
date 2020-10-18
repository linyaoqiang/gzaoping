import React, {Component} from "react"
import {List, Grid} from "antd-mobile"

class HeaderSelector extends Component {
    static headerList = []
    state = {
        icon: null
    }

    gridClick = (el, index) => {
        let {icon, text} = el
        this.setState({
            icon
        })
        this.props.setHeader(text)
    }


    render() {
        let renderHeaderDom = !this.state.icon ? '请选择头像' : (
            <div>
                <i>已选择头像</i>
                <img src={this.state.icon} alt="头像"/>
            </div>
        )
        return (
            <List renderHeader={() => renderHeaderDom}>
                <Grid data={HeaderSelector.headerList}
                      columnNum={5} onClick={this.gridClick}>

                </Grid>
            </List>
        )
    }
}

for (let i = 0; i < 20; i++) {
    let text = `头像${i + 1}`
    let icon = require(`../../assets/images/headers/${text}.png`)
    HeaderSelector.headerList.push({text, icon})
}

export default HeaderSelector