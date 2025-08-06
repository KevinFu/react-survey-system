import Component from './component'
import PropComponent from './PropComponent'
import { SurveyTextareaDefaultProps } from './interface'

export * from './interface'

export default {
  title: 'Textarea Title',
  type: 'surveyTextarea',
  Component,
  PropComponent,
  defaultProps: SurveyTextareaDefaultProps,
}
