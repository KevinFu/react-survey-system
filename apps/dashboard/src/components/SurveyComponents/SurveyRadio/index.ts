import Component from './component'
import PropComponent from './PropComponent'
import StatComponent from './StatComponent'
import { SurveyRadioDefaultProps } from './interface'

export * from './interface'

export default {
  title: 'Radio',
  type: 'surveyRadio',
  Component,
  PropComponent,
  StatComponent,
  defaultProps: SurveyRadioDefaultProps,
}
