import { type FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from '@ant-design/icons'
import useComponentStore from '../../../store/components'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: FC = () => {
  const { selectedId, selectedComponent, copiedComponent } =
    useGetComponentInfo()
  const { isLocked } = selectedComponent || {}

  const removeSelectedComponent = useComponentStore(
    (state) => state.removeSelectedComponent,
  )
  const changeComponentHidden = useComponentStore(
    (state) => state.changeComponentHidden,
  )
  const toggleComponentLocked = useComponentStore(
    (state) => state.toggleComponentLocked,
  )
  const copyComponent = useComponentStore((state) => state.copyComponent)
  const pasteCopiedComponent = useComponentStore(
    (state) => state.pasteCopiedComponent,
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

  function handleCopy() {
    copyComponent()
  }

  function handlePaste() {
    pasteCopiedComponent()
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
      <Tooltip title="Copy">
        <Button shape="circle" onClick={handleCopy} icon={<CopyOutlined />} />
      </Tooltip>
      <Tooltip title="Paste">
        <Button
          shape="circle"
          onClick={handlePaste}
          icon={<BlockOutlined />}
          disabled={copiedComponent === null}
        />
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
