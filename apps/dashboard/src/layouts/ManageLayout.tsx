import { useState, type FC } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  PlusIcon,
  ListBulletIcon,
  StarIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { createSurvey } from '../services/survey'

const navItems = [
  { path: '/manage/list', icon: ListBulletIcon, label: 'My Survey' },
  { path: '/manage/star', icon: StarIcon, label: 'Stared Survey' },
  { path: '/manage/trash', icon: TrashIcon, label: 'Trash' },
]

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [loading, setLoading] = useState(false)

  const onCreate = async () => {
    try {
      setLoading(true)
      const { id } = (await createSurvey()) || {}
      if (id) nav(`/survey/edit/${id}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-1 bg-base-100 w-[1200px] mx-auto">
      <div className="w-1/5 p-4">
        <button
          className="btn btn-success btn-lg w-full"
          disabled={loading}
          onClick={onCreate}
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          New Survey
        </button>

        <ul className="space-y-5 my-10">
          {navItems.map(({ path, icon: Icon, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={`btn w-full ${pathname.startsWith(path) ? 'btn-primary' : 'btn-neutral'}`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-4/5 p-4">
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
