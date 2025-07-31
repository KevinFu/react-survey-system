import type { FC } from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout: FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <div>MainLayout Header</div>
      <Outlet />
      <div>MainLayout Footer</div>
    </div>
  )
}
export default MainLayout
