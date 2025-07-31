import { type FC } from 'react'
import useLoadSurveyInfo from '../../../hooks/useLoadSurveyInfo'

const Edit: FC = () => {
  const { loading, surveyInfo } = useLoadSurveyInfo()

  return (
    <>
      <div>Edit Page</div>
      {loading ? 'loading' : JSON.stringify(surveyInfo)}
    </>
  )
}

export default Edit
