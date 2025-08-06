import type { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useShallow } from 'zustand/shallow'

import useUserStore from '../store/userReducer'
import { removeUserToken } from '../utils/token'
import { LOGIN_PATHNAME } from '../routers'

const UserInfo: FC = () => {
  const nav = useNavigate()

  const { isLoggedIn, user, logout } = useUserStore(
    useShallow((userState) => ({
      isLoggedIn: userState.isLoggedIn,
      user: userState.user,
      logout: userState.logout,
    })),
  )

  function onLogout() {
    logout()
    removeUserToken()
    message.info('LogOut successful')
    nav(LOGIN_PATHNAME)
  }

  const UserInfo = (
    <div className="text-cyan-100">
      <UserOutlined />
      {user.nickname}
      <Button type="link" className="text-cyan-100" onClick={onLogout}>
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

  return <>{isLoggedIn ? UserInfo : Login}</>
}

export default UserInfo
