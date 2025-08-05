export interface SurveyInputPropsType {
  title?: string
  placeholder?: string
  onChange?: (newProps: SurveyInputPropsType) => void
}

export const SurveyInputDefaultProps = {
  title: 'Input Title',
  placeholder: 'Please input...',
}
