import type { FC } from 'react'
import SurveyInputConfType, { type SurveyInputPropsType } from './SurveyInput'
import SurveyTitleConfType, { type SurveyTitlePropsType } from './SurveyTitle'

export type ComponentPropsType = SurveyInputPropsType & SurveyTitlePropsType

export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

const componentConfList: ComponentConfType[] = [
  SurveyInputConfType,
  SurveyTitleConfType,
]

export const componentConfGroup = [
  {
    groupName: 'Text Display',
    components: [SurveyTitleConfType],
  },
  {
    groupName: 'User Input',
    components: [SurveyInputConfType],
  },
]

export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type)
}
