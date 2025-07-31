import type { FC } from 'react'
import { Outlet } from 'react-router-dom'

const SurveyLayout: FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <div>SurveyLayout Header</div>
      <Outlet />
    </div>
  )
}
export default SurveyLayout
