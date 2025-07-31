import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { HOME_PATHNAME } from '../routers'

const Logo: FC = () => {
  return (
    <Link to={HOME_PATHNAME} className="flex items-center">
      <PencilSquareIcon className="w-6 h-6 text-white mr-3" />
      <h1 className="text-2xl font-semibold text-base-content">
        Survey Dashboard
      </h1>
    </Link>
  )
}

export default Logo
