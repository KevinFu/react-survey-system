import { Spin } from 'antd'
import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/userNavPage'

const SurveyLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)

  return (
    <div className="flex flex-col h-screen">
      {waitingUserData ? (
        <div className="text-center py-[150px]">
          <Spin />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  )
}
export default SurveyLayout
