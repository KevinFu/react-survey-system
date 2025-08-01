import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'
import { HOME_PATHNAME } from '../routers'

const Logo: FC = () => {
  return (
    <Link to={HOME_PATHNAME} className="flex items-center">
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
