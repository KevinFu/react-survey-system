import type { FC } from 'react'
import SurveyInputConfType, { type SurveyInputPropsType } from './SurveyInput'
import SurveyTextareaConfType, {
  type SurveyTextareaPropsType,
} from './SurveyTextarea'
import SurveyTitleConfType, { type SurveyTitlePropsType } from './SurveyTitle'
import SurveyParagraphConfType, {
  type SurveyParagraphPropsType,
} from './SurveyParagraph'
import SurveyInfoConfType, { type SurveyInfoPropsType } from './SurveyInfo'
import SurveyRadioConfType, { type SurveyRadioPropsType } from './SurveyRadio'
import SurveyCheckboxConfType, {
  type SurveyCheckboxPropsType,
} from './SurveyCheckbox'

export type ComponentPropsType = SurveyInputPropsType &
  SurveyTextareaPropsType &
  SurveyTitlePropsType &
  SurveyParagraphPropsType &
  SurveyInfoPropsType &
  SurveyRadioPropsType &
  SurveyCheckboxPropsType

export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

const componentConfList: ComponentConfType[] = [
  SurveyInputConfType,
  SurveyTextareaConfType,
  SurveyTitleConfType,
  SurveyParagraphConfType,
  SurveyInfoConfType,
  SurveyRadioConfType,
  SurveyCheckboxConfType,
]

export const componentConfGroup = [
  {
    groupName: 'Text Display',
    components: [
      SurveyTitleConfType,
      SurveyParagraphConfType,
      SurveyInfoConfType,
    ],
  },
  {
    groupName: 'User Input',
    components: [SurveyInputConfType, SurveyTextareaConfType],
  },

  {
    groupName: 'Choose Group',
    components: [SurveyRadioConfType, SurveyCheckboxConfType],
  },
]

export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type)
}
