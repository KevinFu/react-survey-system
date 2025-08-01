import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button } from 'antd'
import { ExclamationCircleOutlined, HomeOutlined } from '@ant-design/icons'
import { HOME_PATHNAME } from '../routers'

const NotFound: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-96 shadow-xl border-gray-700">
        <div className="text-center">
          <ExclamationCircleOutlined className="text-6xl text-yellow-400 mb-4" />
          <h2 className="text-4xl font-bold text-red-400 mb-2">404</h2>
          <h3 className="text-xl font-semibold mb-2 text-white">
            Page Not Found
          </h3>
          <p className="text-gray-400 mb-6">
            Sorry, the page you are looking for does not exist or has been
            removed.
          </p>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate(HOME_PATHNAME)}
            icon={<HomeOutlined />}
          >
            Back to Home
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default NotFound
