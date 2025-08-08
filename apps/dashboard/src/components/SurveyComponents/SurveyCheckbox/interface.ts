export interface SurveyCheckboxOptionType {
  value?: string
  text?: string
  checked?: boolean
}

export interface SurveyCheckboxPropsType {
  title?: string
  isVertical?: boolean
  options?: SurveyCheckboxOptionType[]
  onChange?: (newProps: SurveyCheckboxPropsType) => void
  disabled?: boolean
}

export const SurveyCheckboxDefaultProps: SurveyCheckboxPropsType = {
  title: 'Checkbox Title',
  isVertical: false,
  options: [
    { value: 'item1', text: 'Option 1', checked: false },
    { value: 'item2', text: 'Option 2', checked: false },
    { value: 'item3', text: 'Option 3', checked: false },
  ],
}

export type SurveyCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
