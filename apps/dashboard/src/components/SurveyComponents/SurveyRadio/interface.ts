export interface SurveyRadioOptionType {
  value?: string
  text?: string
}

export interface SurveyRadioPropsType {
  title?: string
  isVertical?: boolean
  options?: SurveyRadioOptionType[]
  value?: string
  onChange?: (newProps: SurveyRadioOptionType) => void
  disabled?: boolean
}

export const SurveyRadioDefaultProps: SurveyRadioPropsType = {
  title: 'Radio Title',
  isVertical: false,
  options: [
    { value: 'item1', text: 'Option 1' },
    { value: 'item2', text: 'Option 2' },
    { value: 'item3', text: 'Option 3' },
  ],
  value: 'item1',
}
