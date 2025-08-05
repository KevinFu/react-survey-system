import { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getSurveyService } from '../services/survey'
import ComponentsStore from '../store/componentsReducer'

const useLoadSurveyInfo = () => {
  const { id = '' } = useParams()
  const resetComponents = ComponentsStore((state) => state.resetComponents)

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
    const selectedId = componentList.length > 0 ? componentList[0].fe_id : ''

    resetComponents({ componentList, selectedId })
  }, [data, resetComponents])

  return { loading, error }
}

export default useLoadSurveyInfo
