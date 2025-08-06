import type { FC, MouseEvent } from 'react'
import { Spin } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/SurveyComponents'
import ComponentsStore, {
  type ComponentInfoType,
} from '../../../store/componentsReducer'
import useCanvasKeyPress from '../../../hooks/useCanvasKeyPress'

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
  const changeSelectedId = ComponentsStore((state) => state.changeSelectedId)

  useCanvasKeyPress()

  function handleClick(e: MouseEvent, fe_id: string) {
    e.stopPropagation()
    changeSelectedId(fe_id)
  }

  if (loading)
    return (
      <div className="text-center my-6">
        <Spin />
      </div>
    )

  return (
    <div className="min-h-[100%] overflow-hidden bg-white">
      {componentList
        .filter((c) => !c.isHidden)
        .map((c) => {
          const { fe_id, isLocked } = c
          return (
            <div
              key={fe_id}
              className={`m-[12px] p-[12px] border rounded-lg border-solid border-white hover:border-[#d9d9d9] ${fe_id === selectedId && '!border-blue-300'} ${isLocked && 'opacity-50 cursor-not-allowed'}`}
              onClick={(e: MouseEvent) => handleClick(e, fe_id)}
            >
              <div className="pointer-events-none">{genComponent(c)}</div>
            </div>
          )
        })}
    </div>
  )
}

export default EditCanvas
