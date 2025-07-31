import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'

const MainLayout: FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-20 bg-base-200 flex items-center justify-between px-20">
        <Logo />
        <UserInfo />
      </div>
      <Outlet />
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            Kevin
          </p>
        </aside>
      </footer>
    </div>
  )
}
export default MainLayout
