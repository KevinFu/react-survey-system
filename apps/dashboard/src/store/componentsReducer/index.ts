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
  addComponent: (newComponent: ComponentInfoType) => void
}

export type ComponentStore = ComponentListStore & ComponentActions

export const ComponentsStore = create<ComponentStore>((set) => ({
  components: INIT_STATE,

  resetComponents: (components) => {
    set({ components })
  },

  changeSelectedId: (fe_id) => {
    set((state) => ({
      components: { ...state.components, selectedId: fe_id },
    }))
  },

  addComponent: (newComponent) => {
    set((state) => {
      const { selectedId, componentList } = state.components
      const index = componentList.findIndex((c) => c.fe_id === selectedId)

      const newComponentList =
        index === -1
          ? [...componentList, newComponent]
          : [
              ...componentList.slice(0, index + 1),
              newComponent,
              ...componentList.slice(index + 1),
            ]

      return {
        components: {
          componentList: newComponentList,
          selectedId: newComponent.fe_id,
        },
      }
    })
  },
}))

export default ComponentsStore
