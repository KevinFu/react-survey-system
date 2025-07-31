import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../routers'

const Logo: FC = () => {
  return <Link to={LOGIN_PATHNAME}>Login</Link>
}

export default Logo
