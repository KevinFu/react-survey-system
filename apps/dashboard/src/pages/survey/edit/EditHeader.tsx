import { type FC } from 'react'
import { Button, Space, Typography } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import EditToolbar from './EditToolbar'

const { Title } = Typography

const EditHeader: FC = () => {
  const nav = useNavigate()
  return (
    <div className="bg-[#fff] p-[12px] border-x-0 border-t-0 border-solid border-b-[#e8e8e8]">
      <div className="flex mx-[24px]">
        <div className="flex-1">
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              Back
            </Button>
            <Title level={5} className="!mb-0">
              Survey Title
            </Title>
          </Space>
        </div>
        <div className="flex-1 text-center">
          <EditToolbar />
        </div>
        <div className="flex-1 text-right">
          <Space>
            <Button>Save</Button>
            <Button type="primary">Publish</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
