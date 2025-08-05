import Component from './component'
import PropComponent from './PropComponent'
import { SurveyTitleDefaultProps } from './interface'

export * from './interface'

export default {
  title: 'Title',
  type: 'surveyTitle',
  Component,
  PropComponent,
  defaultProps: SurveyTitleDefaultProps,
}
