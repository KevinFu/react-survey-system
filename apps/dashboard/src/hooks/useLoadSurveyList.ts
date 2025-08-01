import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { getSurveyList } from '../services/survey'
import { LIST_SEARCH_PARAM_KEY } from '../constant'

interface SearchParams {
  isStar: boolean
  isDeleted: boolean
}
const useLoadSurveyList = (opt: Partial<SearchParams> = {}) => {
  const { isStar = false, isDeleted = false } = opt
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

  const { data, error, loading } = useRequest(
    () => getSurveyList({ keyword, isStar, isDeleted }),
    {
      refreshDeps: [keyword],
    },
  )

  return { data, loading, error }
}

export default useLoadSurveyList
