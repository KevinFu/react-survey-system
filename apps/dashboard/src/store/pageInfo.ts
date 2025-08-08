import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface PageInfo {
  title: string
  desc?: string
  css?: string
  js?: string
  isPublish?: boolean
}

const INIT_STATE: PageInfo = {
  title: '',
  desc: '',
  css: '',
  js: '',
}

export interface PageInfoState {
  pageInfo: PageInfo | null
  resetPageInfo: (pageInfo: PageInfo) => void
  changePageTitle: (title: string) => void
}

const usePageInfoStore = create<PageInfoState>()(
  immer((set) => ({
    pageInfo: INIT_STATE,

    resetPageInfo: (pageInfo) => {
      set((state) => {
        state.pageInfo = pageInfo
      })
    },

    changePageTitle: (newTitle) => {
      set((state) => {
        if (state.pageInfo) state.pageInfo.title = newTitle
      })
    },
  })),
)

export default usePageInfoStore
