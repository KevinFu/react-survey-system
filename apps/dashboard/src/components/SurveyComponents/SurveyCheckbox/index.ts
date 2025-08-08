import Component from './component'
import PropComponent from './PropComponent'
import StatComponent from './StatComponent'
import { SurveyCheckboxDefaultProps } from './interface'

export * from './interface'

export default {
  title: 'Checkbox',
  type: 'surveyCheckbox',
  Component,
  PropComponent,
  StatComponent,
  defaultProps: SurveyCheckboxDefaultProps,
}
