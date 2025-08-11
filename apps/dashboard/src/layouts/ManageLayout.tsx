import { useState, type FC } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button, Layout } from 'antd'
import {
  PlusOutlined,
  UnorderedListOutlined,
  StarOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { createSurveyService } from '../services/survey'

const { Sider, Content } = Layout

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
      const { _id: id } = (await createSurveyService()) || {}
      if (id) nav(`/survey/edit/${id}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout className="flex-1 w-[1200px] mx-auto">
      <Sider width="20%" className="p-4 bg-slate-200">
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
              className={`block w-full px-4 py-2 rounded-lg transition-colors text-white ${
                pathname.startsWith(path)
                  ? 'bg-blue-500'
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Icon className="w-5 h-5 mr-2" />
                {label}
              </div>
            </Link>
          ))}
        </div>
      </Sider>

      <Content className="w-4/5 p-4">
        <Outlet />
      </Content>
    </Layout>
  )
}

export default ManageLayout
