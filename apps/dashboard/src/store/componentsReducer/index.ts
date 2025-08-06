import { create } from 'zustand'
import { getNextSelectedId } from './util'
import type { ComponentPropsType } from '../../components/SurveyComponents'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden: boolean
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

  changeComponentProps: (fe_id, newProps) => {
    set((state) => {
      const { componentList } = state.components
      const index = componentList.findIndex((c) => c.fe_id === fe_id)

      if (index === -1) {
        return state
      }

      const curComponent = componentList[index]
      const updatedComponent = {
        ...curComponent,
        props: {
          ...curComponent.props,
          ...newProps,
        },
      }

      const newComponentList = [
        ...componentList.slice(0, index),
        updatedComponent,
        ...componentList.slice(index + 1),
      ]

      return {
        components: {
          ...state.components,
          componentList: newComponentList,
        },
      }
    })
  },

  removeSelectedComponent: () => {
    set((state) => {
      const { componentList, selectedId } = state.components
      const index = componentList.findIndex((c) => c.fe_id === selectedId)

      const newComponentList = [
        ...componentList.slice(0, index),
        ...componentList.slice(index + 1),
      ]
      const newSelectedId = getNextSelectedId(selectedId, componentList)
      return {
        components: {
          selectedId: newSelectedId,
          componentList: newComponentList,
        },
      }
    })
  },

  changeComponentHidden: (fe_id, isHidden) => {
    set((state) => {
      const { componentList, selectedId } = state.components
      const index = componentList.findIndex((c) => c.fe_id === fe_id)

      if (index === -1) {
        return state
      }

      const curComponent = componentList[index]
      const updatedComponent = { ...curComponent, isHidden }

      const newSelectedId = isHidden
        ? getNextSelectedId(selectedId, componentList)
        : fe_id
      const newComponentList = [
        ...componentList.slice(0, index),
        updatedComponent,
        ...componentList.slice(index + 1),
      ]
      return {
        components: {
          selectedId: newSelectedId,
          componentList: newComponentList,
        },
      }
    })
  },
}))

export default ComponentsStore
