import { type FC } from 'react'
import SurveyInput from '../../../components/SurveyComponents/SurveyInput/component'
import SurveyTitle from '../../../components/SurveyComponents/SurveyTitle/component'
import { Spin } from 'antd'

interface PropsType {
  loading: boolean
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  if (loading)
    return (
      <div className="text-center my-6">
        <Spin />
      </div>
    )

  return (
    <div className="min-h-[100%] overflow-hidden bg-white">
      <div className="m-[12px] p-[12px] border rounded-lg border-solid border-white hover:border-blue-300">
        <div className="pointer-events-none">
          <SurveyTitle />
        </div>
      </div>
      <div className="m-[12px] p-[12px] border rounded-lg border-solid border-white hover:border-blue-300">
        <div className="pointer-events-none">
          <SurveyInput />
        </div>
      </div>
    </div>
  )
}

export default EditCanvas
