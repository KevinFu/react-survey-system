import SurveyInput from './SurveyInput'
import SurveyRadio from './SurveyRadio'
import SurveyTitle from './SurveyTitle'
import SurveyParagraph from './SurveyParagraph'
import SurveyInfo from './SurveyInfo'
import SurveyTextarea from './SurveyTextarea'
import SurveyCheckbox from './SurveyCheckbox'

type ComponentInfoType = {
  fe_id: string
  type: string
  isHidden: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any
}

export const getComponent = (comp: ComponentInfoType) => {
  const { fe_id, type, isHidden, props = {} } = comp

  if (isHidden) return null

  if (type === 'surveyInput') {
    return <SurveyInput fe_id={fe_id} props={props} />
  }

  if (type === 'surveyRadio') {
    return <SurveyRadio fe_id={fe_id} props={props} />
  }

  if (type === 'surveyTitle') {
    return <SurveyTitle {...props} />
  }

  if (type === 'surveyParagraph') {
    return <SurveyParagraph {...props} />
  }

  if (type === 'surveyInfo') {
    return <SurveyInfo {...props} />
  }

  if (type === 'surveyTextarea') {
    return <SurveyTextarea fe_id={fe_id} props={props} />
  }

  if (type === 'surveyCheckbox') {
    return <SurveyCheckbox fe_id={fe_id} props={props} />
  }

  return null
}
