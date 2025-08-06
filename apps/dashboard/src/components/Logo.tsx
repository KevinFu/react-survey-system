import { useEffect, useState, type FC } from 'react'
import { Link } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'
import { HOME_PATHNAME, MANAGE_LIST_PATHNAME } from '../routers'
import useUserStore from '../store/userReducer'

const Logo: FC = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn)
  const [pathname, setPathname] = useState(HOME_PATHNAME)

  useEffect(() => {
    if (isLoggedIn) {
      setPathname(MANAGE_LIST_PATHNAME)
    }
  }, [isLoggedIn])

  return (
    <Link to={pathname} className="flex items-center">
      <EditOutlined
        className="text-white mr-3 text-2xl"
        style={{ lineHeight: 1 }}
      />
      <h1 className="text-2xl font-semibold text-white leading-none m-0">
        Survey Dashboard
      </h1>
    </Link>
  )
}

export default Logo
