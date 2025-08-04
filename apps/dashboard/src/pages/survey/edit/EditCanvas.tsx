import { type FC } from 'react'
import SurveyInput from '../../../components/SurveyComponents/SurveyInput'
import SurveyTitle from '../../../components/SurveyComponents/SurveyTitle'

const EditCanvas: FC = () => {
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
