import { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getSurveyService } from '../services/survey'
import componentsStore from '../store/componentsReducer'

const useLoadSurveyInfo = () => {
  const { id = '' } = useParams()
  const resetComponents = componentsStore((state) => state.resetComponents)

  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('No survey id')

      const data = await getSurveyService(id)
      return data
    },
    {
      manual: true,
    },
  )

  useEffect(() => {
    run(id)
  }, [id, run])

  useEffect(() => {
    if (!data) return

    const { componentList } = data
    resetComponents({ componentList })
  }, [data, resetComponents])

  return { loading, error }
}

export default useLoadSurveyInfo
