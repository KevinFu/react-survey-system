import type { FC } from 'react'
import { Link, Outlet } from 'react-router-dom'

const ManageLayout: FC = () => {
  return (
    <div className="flex">
      <div className="w-1/4 p-4">
        <h1 className="text-2xl font-bold">ManageLayout Left</h1>
        <ul>
          <li>
            <Link to="/manage/list" className="block p-2 hover:bg-gray-100">
              List
            </Link>
          </li>
          <li>
            <Link to="/manage/star" className="block p-2 hover:bg-gray-100">
              Star
            </Link>
          </li>
          <li>
            <Link to="/manage/trash" className="block p-2 hover:bg-gray-100">
              Trash
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-3/4 p-4">
        <Outlet />
      </div>
    </div>
  )
}
export default ManageLayout
