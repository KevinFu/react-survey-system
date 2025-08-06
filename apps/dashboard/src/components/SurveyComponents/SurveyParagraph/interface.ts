export interface SurveyParagraphPropsType {
  text?: string
  isCenter?: boolean
  onChange?: (newProps: SurveyParagraphPropsType) => void
  disabled?: boolean
}

export const SurveyParagraphDefaultProps: SurveyParagraphPropsType = {
  text: 'This is a paragraph',
  isCenter: false,
}
