export interface SurveyInfoPropsType {
  title?: string
  desc?: string
  onChange?: (newProps: SurveyInfoPropsType) => void
  disabled?: boolean
}

export const SurveyInfoDefaultProps = {
  title: 'Survey Title',
  desc: 'description',
}
