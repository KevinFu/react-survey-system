import { create } from 'zustand'
import type { ComponentPropsType } from '../../components/SurveyComponents'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  props: ComponentPropsType
}

export type ComponentStateType = {
  selectedId: string
  componentList: ComponentInfoType[]
}

const INIT_STATE: ComponentStateType = {
  selectedId: '',
  componentList: [],
}

interface ComponentListStore {
  components: ComponentStateType
}

interface ComponentActions {
  resetComponents: (components: ComponentStateType) => void
  changeSelectedId: (fe_id: string) => void
}

export type ComponentStore = ComponentListStore & ComponentActions

export const ComponentsStore = create<ComponentStore>((set) => ({
  components: INIT_STATE,

  resetComponents: (components: ComponentStateType) => {
    set({ components })
  },

  changeSelectedId: (fe_id: string) => {
    set((state) => ({
      components: { ...state.components, selectedId: fe_id },
    }))
  },
}))

export default ComponentsStore
