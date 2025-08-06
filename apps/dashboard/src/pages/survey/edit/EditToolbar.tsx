import { type FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from '@ant-design/icons'
import ComponentsStore from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: FC = () => {
  const { selectedId, selectedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}

  const removeSelectedComponent = ComponentsStore(
    (state) => state.removeSelectedComponent,
  )
  const changeComponentHidden = ComponentsStore(
    (state) => state.changeComponentHidden,
  )
  const toggleComponentLocked = ComponentsStore(
    (state) => state.toggleComponentLocked,
  )

  function handleDelete() {
    removeSelectedComponent()
  }

  function handleHidden() {
    changeComponentHidden(selectedId, true)
  }

  function handleLock() {
    toggleComponentLocked(selectedId)
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
      <Tooltip title="Lock">
        <Button
          shape="circle"
          onClick={handleLock}
          icon={<LockOutlined />}
          type={isLocked ? 'primary' : 'default'}
        />
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
