import axios, { type AxiosResponse } from 'axios'

const instance = axios.create({
  timeout: 5 * 1000,
})

instance.interceptors.response.use((res) => {
  const responseData = (res.data || {}) as ResType
  const { code, data, msg } = responseData

  if (code !== 0) {
    alert(msg)

    throw new Error(msg)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data as AxiosResponse<any, any>
})

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
