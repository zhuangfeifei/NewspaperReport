import axios from 'axios'
import store from './store'
import router from '../router'
import { Toast, Dialog } from 'vant'


let localhostDev = true
let urls = localhostDev ? '/repair' : 'http://www.homeamc.cn'

axios.defaults.baseURL = urls
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 请求拦截
axios.interceptors.request.use(function (config) {
  store.commit('isLoading', true)
    return config

  }, function (error) {
    
    return Promise.reject(error)
})

// 请求
const fetch = (url, params = '') => {
  if(store.state.userId == null){
    window.location.reload()
    return
  }
  // 判断是否是FormData
  const data = Object.prototype.toString.call(params) === '[object FormData]' ? params : $.param(params)   
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
} 

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  store.commit('isLoading', false)
  if(response.data.code != 200) Toast.fail(response.data.message)

    return response;

  }, function (error) {
    Toast.clear();
    Dialog.alert({
        title: error.response.data.message || '网络异常！',
        message: ''
    }).then(() => {
    // on close
    });
    store.commit('isLoading', false)
    return Promise.reject(error)
})

export default {fetch , urls}