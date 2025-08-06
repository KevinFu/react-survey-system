import Component from './component'
import PropComponent from './PropComponent'
import { SurveyRadioDefaultProps } from './interface'

export * from './interface'

export default {
  title: 'Radio',
  type: 'surveyRadio',
  Component,
  PropComponent,
  defaultProps: SurveyRadioDefaultProps,
}
