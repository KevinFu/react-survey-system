import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button } from 'antd'
import { ExclamationCircleOutlined, HomeOutlined } from '@ant-design/icons'
import { HOME_PATHNAME } from '../routers'

const NotFound: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-96 shadow-xl">
        <div className="text-center">
          <ExclamationCircleOutlined className="text-6xl mb-4" />
          <h2 className="text-4xl font-bold mb-2">404</h2>
          <h3 className="text-xl font-semibold mb-2">Page Not Found</h3>
          <p className="mb-6">
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
