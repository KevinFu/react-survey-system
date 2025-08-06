export interface SurveyTextareaPropsType {
  title?: string
  placeholder?: string
  onChange?: (newProps: SurveyTextareaPropsType) => void
  disabled?: boolean
}

export const SurveyTextareaDefaultProps = {
  title: 'Textarea Title',
  placeholder: 'Please input...',
}
