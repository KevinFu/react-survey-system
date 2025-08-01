import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../routers'

const UserInfo: FC = () => {
  return (
    <Link
      to={LOGIN_PATHNAME}
      className="text-white hover:text-gray-300 transition-colors"
    >
      Login
    </Link>
  )
}

export default UserInfo
