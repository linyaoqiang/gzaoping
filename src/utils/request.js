import axios from 'axios'
import requestConfig from './request-config'
import {Toast} from 'antd-mobile'

let request = axios.create(requestConfig)

request.interceptors.request.use(config => {
    config.headers[requestConfig.TOKEN_NAME] = localStorage.getItem(requestConfig.TOKEN_NAME)
    return config
})

request.interceptors.response.use(
    res => {
        let data = res.data
        if (data.code !== 200) {
            Toast.info(data.code)
            return Promise.reject(data)
        }
        return data
    },
    err => Promise.reject(err)
)

export default request