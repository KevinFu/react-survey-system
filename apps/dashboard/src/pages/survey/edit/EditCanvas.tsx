import type { FC, MouseEvent } from 'react'
import { Spin } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import useCanvasKeyPress from '../../../hooks/useCanvasKeyPress'
import { getComponentConfByType } from '../../../components/SurveyComponents'
import useComponentStore, {
  type ComponentInfoType,
} from '../../../store/components'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'

interface PropsType {
  loading: boolean
}

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo

  const componentConf = getComponentConfByType(type)

  if (!componentConf) return null
  const { Component } = componentConf

  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId } = useGetComponentInfo()
  const changeSelectedId = useComponentStore((state) => state.changeSelectedId)
  const moveComponent = useComponentStore((state) => state.moveComponent)

  useCanvasKeyPress()

  function handleClick(e: MouseEvent, fe_id: string) {
    e.stopPropagation()
    changeSelectedId(fe_id)
  }

  const componentListWithId = componentList.map((c) => {
    return { ...c, id: c.fe_id }
  })

  function onDragEnd(oldIndex: number, newIndex: number) {
    moveComponent(oldIndex, newIndex)
  }

  if (loading)
    return (
      <div className="text-center my-6">
        <Spin />
      </div>
    )

  return (
    <SortableContainer items={componentListWithId} onDragEnd={onDragEnd}>
      <div className="min-h-[100%] overflow-hidden bg-white">
        {componentList
          .filter((c) => !c.isHidden)
          .map((c) => {
            const { fe_id, isLocked } = c
            return (
              <SortableItem id={fe_id} key={fe_id}>
                <div
                  className={`m-[12px] p-[12px] border rounded-lg border-solid border-white hover:border-[#d9d9d9] ${fe_id === selectedId && '!border-blue-300'} ${isLocked && 'opacity-50 cursor-not-allowed'}`}
                  onClick={(e: MouseEvent) => handleClick(e, fe_id)}
                >
                  <div className="pointer-events-none">{genComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas
