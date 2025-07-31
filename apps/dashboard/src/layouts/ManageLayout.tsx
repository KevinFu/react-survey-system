import type { FC } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import {
  PlusIcon,
  ListBulletIcon,
  StarIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'

const ManageLayout: FC = () => {
  const { pathname } = useLocation()

  return (
    <div className="flex flex-1 bg-base-100 w-[1200px] mx-auto">
      <div className="w-1/5 p-4">
        <button className="btn btn-success btn-lg w-full">
          <PlusIcon className="w-5 h-5 mr-2" />
          New Survey
        </button>

        <ul className="space-y-5 my-[40px]">
          <li>
            <Link
              to="/manage/list"
              className={`btn w-full ${pathname.startsWith('/manage/list') ? 'btn-primary' : 'btn-neutral'}`}
            >
              <ListBulletIcon className="w-5 h-5 mr-2" />
              My Survey
            </Link>
          </li>
          <li>
            <Link
              to="/manage/star"
              className={`btn w-full ${pathname.startsWith('/manage/star') ? 'btn-primary' : 'btn-neutral'}`}
            >
              <StarIcon className="w-5 h-5 mr-2" />
              Stared Survey
            </Link>
          </li>
          <li>
            <Link
              to="/manage/trash"
              className={`btn w-full ${pathname.startsWith('/manage/trash') ? 'btn-primary' : 'btn-neutral'}`}
            >
              <TrashIcon className="w-5 h-5 mr-2" />
              Trash
            </Link>
          </li>
        </ul>
      </div>

      <div className="w-4/5 p-4">
        <Outlet />
      </div>
    </div>
  )
}
export default ManageLayout
