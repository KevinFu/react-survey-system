import { create } from 'zustand'
import type { ComponentPropsType } from '../../components/SurveyComponents'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  props: ComponentPropsType
}

export type ComponentStateType = {
  componentList: ComponentInfoType[]
}

const INIT_STATE: ComponentStateType = {
  componentList: [],
}

interface ComponentListStore {
  components: ComponentStateType
}

interface ComponentActions {
  resetComponents: (components: ComponentStateType) => void
}

export type ComponentStore = ComponentListStore & ComponentActions

export const useComponentStore = create<ComponentStore>((set) => ({
  components: INIT_STATE,

  resetComponents: (components: ComponentStateType) => {
    set({ components })
  },
}))

export default useComponentStore
