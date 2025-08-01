import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { getSurveyList } from '../services/survey'
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_DEFAULT_PAGE_SIZE,
} from '../constant'

interface SearchParams {
  isStar: boolean
  isDeleted: boolean
}
const useLoadSurveyList = (opt: Partial<SearchParams> = {}) => {
  const { isStar = false, isDeleted = false } = opt
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  const page = Number(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
  const pageSize =
    Number(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') ||
    LIST_DEFAULT_PAGE_SIZE

  const { data, error, loading } = useRequest(
    () => getSurveyList({ keyword, isStar, isDeleted, page, pageSize }),
    {
      refreshDeps: [keyword, page, pageSize],
    },
  )

  return { data, loading, error }
}

export default useLoadSurveyList
