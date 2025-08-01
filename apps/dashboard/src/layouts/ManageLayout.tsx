import { useState, type FC } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import {
  PlusOutlined,
  UnorderedListOutlined,
  StarOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { createSurvey } from '../services/survey'

const navItems = [
  { path: '/manage/list', icon: UnorderedListOutlined, label: 'My Survey' },
  { path: '/manage/star', icon: StarOutlined, label: 'Stared Survey' },
  { path: '/manage/trash', icon: DeleteOutlined, label: 'Trash' },
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
    <div className="flex flex-1 bg-gray-900 w-[1200px] mx-auto">
      <div className="w-1/5 p-4">
        <Button
          type="primary"
          size="large"
          className="w-full h-12"
          loading={loading}
          onClick={onCreate}
          icon={<PlusOutlined />}
        >
          New Survey
        </Button>

        <div className="space-y-5 my-10">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`block w-full px-4 py-2 rounded-lg transition-colors ${
                pathname.startsWith(path)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Icon className="w-5 h-5 mr-2" />
                {label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-4/5 p-4">
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
