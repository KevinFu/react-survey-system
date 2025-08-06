import { type FC } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
  getComponentConfByType,
  type ComponentPropsType,
} from '../../../components/SurveyComponents'
import useComponentStore from '../../../store/components'

const NoProp = () => <div className="text-center">No Component Props</div>

const ComponentProp: FC = () => {
  const { selectedComponent } = useGetComponentInfo()

  const changeComponentProps = useComponentStore(
    (state) => state.changeComponentProps,
  )

  if (!selectedComponent) return <NoProp />

  const { type, props, isLocked } = selectedComponent
  const componentConf = getComponentConfByType(type)

  if (!componentConf) return <NoProp />

  function changeProps(newProps: ComponentPropsType) {
    if (!selectedComponent) return
    const { fe_id } = selectedComponent
    changeComponentProps(fe_id, newProps)
  }

  const { PropComponent } = componentConf

  return <PropComponent {...props} onChange={changeProps} disabled={isLocked} />
}

export default ComponentProp
