import { type FC } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
  getComponentConfByType,
  type ComponentPropsType,
} from '../../../components/SurveyComponents'
import ComponentsStore from '../../../store/componentsReducer'

const NoProp = () => <div className="text-center">No Component Props</div>

const ComponentProp: FC = () => {
  const { selectedComponent } = useGetComponentInfo()

  const changeComponentProps = ComponentsStore(
    (state) => state.changeComponentProps,
  )

  if (!selectedComponent) return <NoProp />

  const { type, props } = selectedComponent
  const componentConf = getComponentConfByType(type)

  if (!componentConf) return <NoProp />

  function changeProps(newProps: ComponentPropsType) {
    if (!selectedComponent) return
    const { fe_id } = selectedComponent
    changeComponentProps(fe_id, newProps)
  }

  const { PropComponent } = componentConf

  return <PropComponent {...props} onChange={changeProps} />
}

export default ComponentProp
