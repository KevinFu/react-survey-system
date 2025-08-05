import Component from './component'
import PropComponent from './PropComponent'
import { SurveyInputDefaultProps } from './interface'

export * from './interface'

export default {
  title: 'Input Title',
  type: 'surveyInput',
  Component,
  PropComponent,
  defaultProps: SurveyInputDefaultProps,
}
