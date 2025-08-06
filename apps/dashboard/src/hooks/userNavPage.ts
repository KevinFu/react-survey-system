import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import useUserStore from '../store/userReducer'
import {
  isLoginOrRegister,
  isNoNeedUserInfo,
  LOGIN_PATHNAME,
  MANAGE_LIST_PATHNAME,
} from '../routers'

function useNavPage(waitingUserData: boolean) {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const { username } = useUserStore((state) => state.user)

  useEffect(() => {
    if (waitingUserData) return
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_LIST_PATHNAME)
      }
      return
    }

    if (isNoNeedUserInfo(pathname)) {
      return
    } else {
      nav(LOGIN_PATHNAME)
    }
  }, [nav, pathname, username, waitingUserData])
}

export default useNavPage
