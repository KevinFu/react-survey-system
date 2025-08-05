import { type FC } from 'react'
import EditCanvas from './EditCanvas'
import LeftPanel from './LeftPanel'

import useLoadSurveyInfo from '../../../hooks/useLoadSurveyInfo'
import ComponentsStore from '../../../store/componentsReducer'

const Edit: FC = () => {
  const { loading } = useLoadSurveyInfo()
  const changeSelectedId = ComponentsStore((state) => state.changeSelectedId)

  function clearSelectedId() {
    changeSelectedId('')
  }

  return (
    <div className="flex flex-col h-screen bg-[#f0f2f5]">
      <div className="h-[40px] bg-[#fff]">Header</div>
      <div className="flex-auto flex-row py-[12px]">
        <div className="flex h-[100%] mx-[24px]">
          <div className="w-[285px] px-[12px] bg-[#fff]">
            <LeftPanel />
          </div>
          <div
            className="flex-1 overflow-hidden relative"
            onClick={clearSelectedId}
          >
            <div className="absolute w-[400px] h-[712px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] overflow-auto shadow-[0_2px_10px_#0000001f]">
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className="w-[300px] px-[12px] bg-[#fff]">Right</div>
        </div>
      </div>
    </div>
  )
}

export default Edit
