import { useEffect, useState, type FC } from 'react'
import { Button, Card, Spin } from 'antd'
import useLoadSurveyInfo from '../../../hooks/useLoadSurveyInfo'
import usePageInfoStore from '../../../store/pageInfo'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import StatHeader from './StatHeader'
import SurveyComponentList from './ComponentList'
import PageStat from './PageStat'

const Stat: FC = () => {
  const navigate = useNavigate()
  const { loading } = useLoadSurveyInfo()
  const { title, isPublish } = usePageInfoStore((state) => state.pageInfo) || {}

  const [selectComponentId, setSelectComponentId] = useState('')
  const [selectComponentType, setSelectComponentType] = useState('')

  useEffect(() => {
    console.log(selectComponentId, selectComponentType)
  }, [selectComponentId, selectComponentType])

  useTitle(`Survey Statistics - ${title}`)

  const LoadingElem = (
    <div className="text-center mt-[100px]">
      <Spin />
    </div>
  )

  function genContentElem() {
    if (typeof isPublish === 'boolean' && !isPublish) {
      return (
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-96 shadow-xl">
            <div className="text-center">
              <ExclamationCircleOutlined className="text-6xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Survey Not Published
              </h3>
              <Button type="primary" size="large" onClick={() => navigate(-1)}>
                Back to Last Page
              </Button>
            </div>
          </Card>
        </div>
      )
    }

    return (
      <>
        <div className="w-[380px] bg-white mr-6 overflow-y-auto">
          <SurveyComponentList
            selectComponentId={selectComponentId}
            selectComponentType={selectComponentType}
            setSelectComponentId={setSelectComponentId}
            setSelectComponentType={setSelectComponentType}
          />
        </div>
        <div className="flex-auto max-w-[calc(100vw-780px)] bg-white p-4">
          <PageStat
            selectComponentId={selectComponentId}
            setSelectComponentId={setSelectComponentId}
            setSelectComponentType={setSelectComponentType}
          />
        </div>
        <div className="w-[400px] ml-6 bg-white p-4">Right</div>
      </>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f0f2f5]">
      <div>
        <StatHeader />
      </div>
      <div className="flex-auto py-3">
        {loading && LoadingElem}
        {!loading && (
          <div className="mx-6 flex h-[calc(100vh-80px)] overflow-hidden">
            {genContentElem()}
          </div>
        )}
      </div>
    </div>
  )
}

export default Stat
