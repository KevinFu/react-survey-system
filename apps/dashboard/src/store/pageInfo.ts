import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface PageInfo {
  title: string
  desc?: string
  css?: string
  js?: string
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
}

const usePageInfoStore = create<PageInfoState>()(
  immer((set) => ({
    pageInfo: INIT_STATE,

    resetPageInfo: (pageInfo) => {
      set((state) => {
        state.pageInfo = pageInfo
      })
    },
  })),
)

export default usePageInfoStore
