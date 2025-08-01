import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'

const MainLayout: FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="h-20 bg-gray-800 flex items-center justify-between px-20 border-b border-gray-700">
        <Logo />
        <UserInfo />
      </div>
      <Outlet />
      <footer className="bg-gray-800 text-gray-300 p-4 text-center border-t border-gray-700">
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Kevin
        </p>
      </footer>
    </div>
  )
}
export default MainLayout
