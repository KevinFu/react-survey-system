import axios, { type AxiosResponse } from 'axios'
import { message } from 'antd'
import { getUserToken } from '../utils/token'

const instance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5 * 1000,
})

instance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${getUserToken()}`
    return config
  },
  (error) => Promise.reject(error),
)

instance.interceptors.response.use(
  (res) => {
    const responseData = (res.data || {}) as ResType
    const { code, data, msg } = responseData

    if (code !== 0) {
      message.error(msg)
      throw new Error(msg)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data as AxiosResponse<any, any>
  },
  (err) => {
    const { msg } = err.response.data
    message.error(msg)
    throw new Error(err)
  },
)

export default instance

export type ResType = {
  code: number
  data?: ResDataType
  msg?: string
}

export type ResDataType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
