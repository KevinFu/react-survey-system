import { type FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import { DeleteOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import ComponentsStore from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: FC = () => {
  const { selectedId } = useGetComponentInfo()

  const removeSelectedComponent = ComponentsStore(
    (state) => state.removeSelectedComponent,
  )
  const changeComponentHidden = ComponentsStore(
    (state) => state.changeComponentHidden,
  )

  function handleDelete() {
    removeSelectedComponent()
  }

  function handleHidden() {
    changeComponentHidden(selectedId, true)
  }

  return (
    <Space>
      <Tooltip title="Delete">
        <Button
          shape="circle"
          onClick={handleDelete}
          icon={<DeleteOutlined />}
        />
      </Tooltip>
      <Tooltip title="Hidden">
        <Button
          shape="circle"
          onClick={handleHidden}
          icon={<EyeInvisibleOutlined />}
        />
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
