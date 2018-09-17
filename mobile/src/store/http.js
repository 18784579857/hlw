import Axios from 'axios'
// import { Message } from 'element-ui'
import { Indicator, MessageBox, Toast } from 'mint-ui'
import router from '../router'
Axios.defaults.withCredentials = true
// request拦截器
Axios.interceptors.request.use(
  config => {
    return config
  }, error => {
    return Promise.reject(error)
  }
)

// response拦截器
Axios.interceptors.response.use(
  response => {
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
      if (response.data.code === '-1') {
        Indicator.close()
        MessageBox.alert('登录状态已失效，稍后重新登录！').then(action => {
          router.push({name: 'Login'})
        })
      } else {
        return response.data
      }
    } else if (response.status === 500) {
      // Message.error('服务器异常', '提示')
      Toast({
        message: '服务器异常',
        iconClass: 'el-icon-error'
      })
    } else {
      // Message.error('网络异常', '提示')
      Toast({
        message: '网络异常',
        iconClass: 'el-icon-error'
      })
    }
  },
  error => {
    if (error.response === undefined) {
      // Message.error('网络异常', '提示')
      Toast({
        message: '网络异常',
        iconClass: 'el-icon-error'
      })
    } else if (error.response.status === 404) {
      // Message.error('接口已丢失', '提示')
      Toast({
        message: '接口已丢失',
        iconClass: 'el-icon-error'
      })
    } else if (error.response.status === 500) {
      // Message.error('服务器异常', '提示')
      Toast({
        message: '服务器异常',
        iconClass: 'el-icon-error'
      })
    }
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param params
*/
export function axiosGet (url, params = {}) {
  return new Promise((resolve, reject) => {
    Axios.get(url).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}
/**
 * 封装post方法
 * @param url
 * @param params
 * @param headers
*/
export function axiosPost (url, params = {}, headers) {
  return new Promise((resolve, reject) => {
    Axios.post(url, params, headers).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}
