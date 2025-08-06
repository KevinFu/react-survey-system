import Component from './component'
import PropComponent from './PropComponent'
import { SurveyParagraphDefaultProps } from './interface'

export * from './interface'

export default {
  title: 'This is a paragraph',
  type: 'surveyParagraph',
  Component,
  PropComponent,
  defaultProps: SurveyParagraphDefaultProps,
}
