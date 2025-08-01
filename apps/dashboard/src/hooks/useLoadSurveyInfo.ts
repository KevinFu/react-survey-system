import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getSurvey } from '../services/survey'

const useLoadSurveyInfo = () => {
  const { id = '' } = useParams()

  const {
    data = {},
    error,
    loading,
  } = useRequest(() => (id ? getSurvey(id) : Promise.resolve({})), {
    manual: false,
    refreshDeps: [id],
  })

  return { surveyInfo: data, loading, error }
}

export default useLoadSurveyInfo
