import { store } from '/@/store/index'
import axios from 'axios'
import { AxiosResponse } from 'axios'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'

let loading: { close(): void }
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: import.meta.env.VITE_BASE_API as string | undefined,
  timeout: 60000 // 请求超时时间
})

// 创建loading配置
declare module 'axios' {
  export interface AxiosRequestConfig {
    showLoading?: boolean
  }
}

// 异常拦截处理器
const errorHandler = (error: { message: string }) => {
  loading.close()
  console.log(`err${error}`)
  ElMessage.error(error.message)
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use((config) => {
  console.log(config.showLoading)
  if (config.showLoading !== false) {
    loading = ElLoading.service({
      lock: true,
      text: '加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.4)'
    })
  }

  const token = store.state.layout.token.ACCESS_TOKEN
  // 如果 token 存在
  if (token) {
    config.headers['Authorization'] = 'bearer ' + token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response: AxiosResponse<IResponse>) => {
  const { data, config } = response
  if (config.showLoading !== false) {
    loading.close()
  }
  if (data.code !== 0) {
    if (data.code !== 203 && data.code !== 220) {
      ElMessage.error(data.message)
    }
    if (data.code === 104 || data.code === 142 || data.code === 143 || data.code === 2218) {
      setTimeout(() => {
        store.commit('layout/logout')
      }, 3000)
    } else if (data.code === 220) {
      ElMessageBox.confirm(`${data.message}`, '提示', {
        showCancelButton: false,
        confirmButtonText: '我知道了'
      })
        .then(() => {})
        .catch(() => {})
    }
    // @ts-ignore
    return Promise.reject(response)
  }
  return response
}, errorHandler)

export default request
