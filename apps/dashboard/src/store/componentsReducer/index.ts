import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { getNextSelectedId } from './util'
import type { ComponentPropsType } from '../../components/SurveyComponents'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden: boolean
  isLocked: boolean
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
  changeComponentProps: (fe_id: string, newProps: ComponentPropsType) => void
  removeSelectedComponent: () => void
  changeComponentHidden: (fe_id: string, isHidden: boolean) => void
  toggleComponentLocked: (fe_id: string) => void
}

export type ComponentStore = ComponentListStore & ComponentActions

export const ComponentsStore = create<ComponentStore>()(
  immer((set) => ({
    components: INIT_STATE,
    resetComponents: (components) => {
      set({ components })
    },

    changeSelectedId: (fe_id) => {
      set((state) => {
        state.components.selectedId = fe_id
      })
    },

    addComponent: (newComponent) => {
      set((state) => {
        const { selectedId, componentList } = state.components
        const index = componentList.findIndex((c) => c.fe_id === selectedId)

        if (index === -1) {
          componentList.push(newComponent)
        } else {
          componentList.splice(index + 1, 0, newComponent)
        }
        state.components.selectedId = newComponent.fe_id
      })
    },

    changeComponentProps: (fe_id, newProps) => {
      set((state) => {
        const { componentList } = state.components
        const index = componentList.findIndex((c) => c.fe_id === fe_id)

        if (index === -1) {
          return
        }

        const curComponent = componentList[index]

        curComponent.props = { ...curComponent.props, ...newProps }
      })
    },

    removeSelectedComponent: () => {
      set((state) => {
        const { componentList, selectedId } = state.components
        const newSelectedId = getNextSelectedId(selectedId, componentList)

        state.components.componentList = componentList.filter(
          (c) => c.fe_id !== selectedId,
        )
        state.components.selectedId = newSelectedId
      })
    },

    changeComponentHidden: (fe_id, isHidden) => {
      set((state) => {
        const { componentList, selectedId } = state.components
        const index = componentList.findIndex((c) => c.fe_id === fe_id)

        if (index === -1) {
          return
        }

        const newSelectedId = isHidden
          ? getNextSelectedId(selectedId, componentList)
          : fe_id
        const curComponent = componentList[index]

        curComponent.isHidden = isHidden
        state.components.selectedId = newSelectedId
      })
    },

    toggleComponentLocked: (fe_id) => {
      set((state) => {
        const { componentList } = state.components
        const index = componentList.findIndex((c) => c.fe_id === fe_id)

        if (index === -1) {
          return
        }

        const curComponent = componentList[index]
        curComponent.isLocked = !curComponent.isLocked
      })
    },
  })),
)

export default ComponentsStore
