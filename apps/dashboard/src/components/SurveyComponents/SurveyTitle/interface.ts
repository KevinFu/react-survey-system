export interface SurveyTitlePropsType {
  text?: string
  level?: 1 | 2 | 3
  isCenter?: boolean
}

export const SurveyTitleDefaultProps: SurveyTitlePropsType = {
  text: 'This is a Heading 1',
  level: 1,
  isCenter: false,
}
