import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/userNavPage'

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)

  return (
    <Layout className="flex flex-col">
      <Header className="h-20 flex items-center justify-between px-20">
        <Logo />
        <UserInfo />
      </Header>
      <Content className="flex-1">
        {waitingUserData ? (
          <div className="text-center py-[150px]">
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </Content>
      <Footer className="p-4 text-center">
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Kevin
        </p>
      </Footer>
    </Layout>
  )
}
export default MainLayout
