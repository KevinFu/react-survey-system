import { type FC } from 'react'
import { Button, Card, Spin } from 'antd'
import useLoadSurveyInfo from '../../../hooks/useLoadSurveyInfo'
import usePageInfoStore from '../../../store/pageInfo'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'

const Stat: FC = () => {
  const navigate = useNavigate()
  const { loading } = useLoadSurveyInfo()
  const { title, isPublish } = usePageInfoStore((state) => state.pageInfo) || {}

  useTitle(`Survey Statistics - ${title}`)

  if (loading) {
    return (
      <div className="text-center mt-[100px]">
        <Spin />
      </div>
    )
  }

  if (!isPublish) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-96 shadow-xl">
          <div className="text-center">
            <ExclamationCircleOutlined className="text-6xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Survey Not Published</h3>
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
      <div>2</div>
    </>
  )
}

export default Stat
