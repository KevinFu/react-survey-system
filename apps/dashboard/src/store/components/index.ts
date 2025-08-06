import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'
import { getNextSelectedId, insertNewComponent } from './util'
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
  copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
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
  copyComponent: () => void
  pasteCopiedComponent: () => void
  selectPrevComponent: () => void
  selectNextComponent: () => void
  changeComponentTitle: (fe_id: string, newTitle: string) => void
}

export type ComponentStore = ComponentListStore & ComponentActions

export const useComponentStore = create<ComponentStore>()(
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
        insertNewComponent(state.components, newComponent)
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

    copyComponent: () => {
      set((state) => {
        const { selectedId, componentList } = state.components
        const curComponent = componentList.find((c) => c.fe_id === selectedId)
        if (!curComponent) return

        state.components.copiedComponent = cloneDeep(curComponent)
      })
    },

    pasteCopiedComponent: () => {
      set((state) => {
        const { copiedComponent } = state.components

        if (copiedComponent === null) return

        copiedComponent.fe_id = nanoid()
        insertNewComponent(state.components, copiedComponent)
      })
    },

    selectPrevComponent: () => {
      set((state) => {
        const { selectedId, componentList } = state.components
        const selectedIndex = componentList.findIndex(
          (c) => c.fe_id === selectedId,
        )

        if (selectedIndex <= 0) return
        state.components.selectedId = componentList[selectedIndex - 1].fe_id
      })
    },

    selectNextComponent: () => {
      set((state) => {
        const { selectedId, componentList } = state.components
        const length = componentList.length
        const selectedIndex = componentList.findIndex(
          (c) => c.fe_id === selectedId,
        )

        if (selectedIndex < 0 || selectedIndex === length - 1) return

        state.components.selectedId = componentList[selectedIndex + 1].fe_id
      })
    },

    changeComponentTitle: (fe_id, newTitle) => {
      set((state) => {
        const { componentList } = state.components
        const index = componentList.findIndex((c) => c.fe_id === fe_id)

        if (index === -1) {
          return
        }

        const curComponent = componentList[index]

        if (curComponent) curComponent.title = newTitle
      })
    },
  })),
)

export default useComponentStore
