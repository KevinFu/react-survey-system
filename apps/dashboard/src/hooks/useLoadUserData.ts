import { useEffect, useState } from 'react'
import useUserStore from '../store/user'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../services/user'

function useLoadUserData() {
  const login = useUserStore((state) => state.login)
  const { username } = useUserStore((state) => state.user)
  const [waitingUserData, setWaitingUserData] = useState(true)

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
    if (username) {
      setWaitingUserData(false)
      return
    }
    run()
  }, [username, run])

  return { waitingUserData }
}

export default useLoadUserData
