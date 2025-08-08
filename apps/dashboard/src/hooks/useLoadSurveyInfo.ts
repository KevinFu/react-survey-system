import { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getSurveyService } from '../services/survey'
import useComponentStore from '../store/components'
import usePageInfoStore from '../store/pageInfo'

const useLoadSurveyInfo = () => {
  const { id = '' } = useParams()
  const resetComponents = useComponentStore((state) => state.resetComponents)
  const resetPageInfo = usePageInfoStore((state) => state.resetPageInfo)

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

    const { title, desc, css, js, isPublish, componentList } = data
    const selectedId = componentList.length > 0 ? componentList[0].fe_id : ''

    resetComponents({ componentList, selectedId, copiedComponent: null })
    resetPageInfo({ title, desc, css, js, isPublish })
  }, [data, resetComponents, resetPageInfo])

  return { loading, error }
}

export default useLoadSurveyInfo
