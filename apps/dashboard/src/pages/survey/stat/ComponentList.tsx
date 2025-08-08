import type { FC, MouseEvent } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import useCanvasKeyPress from '../../../hooks/useCanvasKeyPress'
import { getComponentConfByType } from '../../../components/SurveyComponents'
import { type ComponentInfoType } from '../../../store/components'

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo

  const componentConf = getComponentConfByType(type)

  if (!componentConf) return null
  const { Component } = componentConf

  return <Component {...props} />
}

interface PropsType {
  selectComponentId: string
  selectComponentType: string
  setSelectComponentId: (id: string) => void
  setSelectComponentType: (type: string) => void
}

const SurveyComponentList: FC<PropsType> = (props) => {
  const { componentList } = useGetComponentInfo()
  const { selectComponentId, setSelectComponentId, setSelectComponentType } =
    props

  useCanvasKeyPress()

  function handleClick(e: MouseEvent, fe_id: string, type: string) {
    e.stopPropagation()
    setSelectComponentId(fe_id)
    setSelectComponentType(type)
  }

  return (
    <>
      {componentList
        .filter((c) => !c.isHidden)
        .map((c) => {
          const { fe_id, type } = c
          return (
            <div
              key={fe_id}
              className={`m-[12px] p-[12px] border rounded-lg border-solid border-white hover:border-[#d9d9d9] ${fe_id === selectComponentId && '!border-blue-300'} 'opacity-80'}`}
              onClick={(e: MouseEvent) => handleClick(e, fe_id, type)}
            >
              <div className="pointer-events-none">{genComponent(c)}</div>
            </div>
          )
        })}
    </>
  )
}

export default SurveyComponentList
