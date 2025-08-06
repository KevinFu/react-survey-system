import Component from './component'
import PropComponent from './PropComponent'
import { SurveyInfoDefaultProps } from './interface'

export * from './interface'

export default {
  title: 'Survey Title',
  type: 'surveyInfo',
  Component,
  PropComponent,
  defaultProps: SurveyInfoDefaultProps,
}
