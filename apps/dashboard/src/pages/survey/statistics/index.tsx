import { type FC } from 'react'
import useLoadSurveyInfo from '../../../hooks/useLoadSurveyInfo'

const Statistics: FC = () => {
  const { loading, surveyInfo } = useLoadSurveyInfo()

  return (
    <>
      <div>Statistics Page</div>
      {loading ? 'loading' : JSON.stringify(surveyInfo)}
    </>
  )
}

export default Statistics
