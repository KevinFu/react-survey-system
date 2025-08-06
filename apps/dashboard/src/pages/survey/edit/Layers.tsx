import { useState, type ChangeEvent, type FC } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { Button, Input, message, Space } from 'antd'
import ComponentsStore from '../../../store/componentsReducer'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'

const Layers: FC = () => {
  const [changingTitleId, setChangingTitleId] = useState('')

  const { componentList, selectedId } = useGetComponentInfo()
  const changeSelectedId = ComponentsStore((state) => state.changeSelectedId)
  const changeComponentTitle = ComponentsStore(
    (state) => state.changeComponentTitle,
  )
  const toggleComponentLocked = ComponentsStore(
    (state) => state.toggleComponentLocked,
  )

  const changeComponentHidden = ComponentsStore(
    (state) => state.changeComponentHidden,
  )

  function handleTitleClick(fe_id: string) {
    const curComponent = componentList.find((c) => c.fe_id === fe_id)
    if (curComponent && curComponent.isHidden) {
      message.info('Can not selected hidden component')
    }

    if (fe_id !== selectedId) {
      changeSelectedId(fe_id)
      setChangingTitleId('')
    } else {
      setChangingTitleId(fe_id)
    }
  }

  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle || !selectedId) return

    changeComponentTitle(selectedId, newTitle)
  }

  function changeHidden(fe_id: string, isHidden: boolean) {
    changeComponentHidden(fe_id, isHidden)
  }

  function changeLocked(fe_id: string) {
    toggleComponentLocked(fe_id)
  }

  return (
    <>
      {componentList.map((c) => {
        const { fe_id, title, isHidden, isLocked } = c
        return (
          <div
            key={fe_id}
            className="group flex py-[6px] border border-solid border-t-0 border-x-0 border-b border-[rgba(0,0,0,0.06)]"
          >
            <div
              onClick={() => {
                handleTitleClick(fe_id)
              }}
              className={`flex-auto leading-loose ${fe_id === selectedId && 'text-blue-500'}`}
            >
              {fe_id === changingTitleId ? (
                <Input
                  value={title}
                  onChange={changeTitle}
                  onBlur={() => setChangingTitleId('')}
                  onPressEnter={() => setChangingTitleId('')}
                />
              ) : (
                title
              )}
            </div>
            <div className="w-[80px] text-right">
              <Space>
                <Button
                  size="small"
                  shape="circle"
                  icon={<EyeInvisibleOutlined />}
                  type={isHidden ? 'primary' : 'text'}
                  onClick={() => changeHidden(fe_id, !isHidden)}
                  className={`group-hover:opacity-100 ${!isHidden ? 'opacity-20' : ''}`}
                />
                <Button
                  size="small"
                  shape="circle"
                  icon={<LockOutlined />}
                  type={isLocked ? 'primary' : 'text'}
                  onClick={() => changeLocked(fe_id)}
                  className={`group-hover:opacity-100 ${!isLocked ? 'opacity-20' : ''}`}
                />
              </Space>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Layers
