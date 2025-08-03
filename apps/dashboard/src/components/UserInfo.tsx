import type { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, message } from 'antd'

import { useRequest } from 'ahooks'
import { getUserInfoService } from '../services/user'
import { LOGIN_PATHNAME } from '../routers'
import { UserOutlined } from '@ant-design/icons'
import { removeUserToken } from '../utils/token'

const UserInfo: FC = () => {
  const nav = useNavigate()

  const { data = {} } = useRequest(getUserInfoService)

  const { nickname } = data

  function logout() {
    removeUserToken()
    message.info('LogOut successful')
    nav(LOGIN_PATHNAME)
  }

  const UserInfo = (
    <div className="text-cyan-100">
      <UserOutlined />
      {nickname}
      <Button type="link" className="text-cyan-100" onClick={logout}>
        LogOut
      </Button>
    </div>
  )

  const Login = (
    <Link
      to={LOGIN_PATHNAME}
      className="text-white hover:text-gray-300 transition-colors"
    >
      Login
    </Link>
  )

  return <>{nickname ? UserInfo : Login}</>
}

export default UserInfo
