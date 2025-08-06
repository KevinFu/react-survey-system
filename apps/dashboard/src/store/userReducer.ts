import { create } from 'zustand'

interface User {
  username: string
  nickname: string
}

interface UserState {
  user: User
  isLoggedIn: boolean
}

interface UserActions {
  login: (user: User) => void
  logout: () => void
}

export type UserStore = UserState & UserActions

const INIT_USER_STATE: User = { nickname: '', username: '' }

const useUserStore = create<UserStore>((set) => ({
  user: INIT_USER_STATE,
  isLoggedIn: false,

  login: (user: User) => {
    set({ user, isLoggedIn: true })
  },

  logout: () => {
    set({ user: INIT_USER_STATE, isLoggedIn: false })
  },
}))

export default useUserStore
