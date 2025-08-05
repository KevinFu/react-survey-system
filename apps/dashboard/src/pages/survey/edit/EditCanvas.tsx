import { type FC } from 'react'
import { Spin } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/SurveyComponents'
import { type ComponentInfoType } from '../../../store/componentsReducer'

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
  const { componentList } = useGetComponentInfo()

  console.log('componentList', componentList)

  if (loading)
    return (
      <div className="text-center my-6">
        <Spin />
      </div>
    )

  return (
    <div className="min-h-[100%] overflow-hidden bg-white">
      {componentList.map((c) => {
        const { fe_id } = c
        return (
          <div
            key={fe_id}
            className="m-[12px] p-[12px] border rounded-lg border-solid border-white hover:border-blue-300"
          >
            <div className="pointer-events-none">{genComponent(c)}</div>
          </div>
        )
      })}
    </div>
  )
}

export default EditCanvas
