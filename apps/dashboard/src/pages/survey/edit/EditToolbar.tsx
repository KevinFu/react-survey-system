import { type FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import ComponentsStore from '../../../store/componentsReducer'

const EditToolbar: FC = () => {
  const removeSelectedComponent = ComponentsStore(
    (state) => state.removeSelectedComponent,
  )

  function handleDelete() {
    removeSelectedComponent()
  }

  return (
    <Space>
      <Tooltip title="delete">
        <Button
          shape="circle"
          onClick={handleDelete}
          icon={<DeleteOutlined />}
        />
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
