import { useEffect, useState } from 'react'
import useUserStore from '../store/userReducer'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../services/user'

function useLoadUserData() {
  const [waitingUserData, setWaitingUserData] = useState(true)
  const { nickname } = useUserStore((state) => state.user)
  const login = useUserStore((state) => state.login)

  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess: (res) => {
      const { nickname, username } = res
      login({ nickname, username })
    },
    onFinally: () => {
      setWaitingUserData(false)
    },
  })

  useEffect(() => {
    if (nickname) {
      setWaitingUserData(false)
      return
    }
    run()
  }, [nickname, run])

  return { waitingUserData }
}

export default useLoadUserData
