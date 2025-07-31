import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import { getSurvey } from '../services/survey'

const useLoadSurveyInfo = () => {
  const { id = '' } = useParams()

  const {
    data = {},
    error,
    isLoading,
  } = useSWR(id ? ['survey', id] : null, getSurvey)

  return { surveyInfo: data, loading: isLoading, error }
}

export default useLoadSurveyInfo
