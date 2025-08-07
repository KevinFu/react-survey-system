import { useKeyPress } from 'ahooks'
import useComponentStore from '../store/components'

function isActiveElementValid() {
  return (
    document.activeElement === document.body ||
    document.activeElement?.matches('div[role="button"]')
  )
}
const useCanvasKeyPress = () => {
  const removeSelectedComponent = useComponentStore(
    (state) => state.removeSelectedComponent,
  )
  const copyComponent = useComponentStore((state) => state.copyComponent)
  const pasteCopiedComponent = useComponentStore(
    (state) => state.pasteCopiedComponent,
  )
  const selectPrevComponent = useComponentStore(
    (state) => state.selectPrevComponent,
  )
  const selectNextComponent = useComponentStore(
    (state) => state.selectNextComponent,
  )
  const { undo, redo } = useComponentStore.temporal.getState()

  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return
    removeSelectedComponent()
  })

  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    copyComponent()
  })

  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    pasteCopiedComponent()
  })

  useKeyPress('uparrow', () => {
    if (!isActiveElementValid()) return
    selectPrevComponent()
  })

  useKeyPress('downarrow', () => {
    if (!isActiveElementValid()) return
    selectNextComponent()
  })

  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElementValid()) return
      undo()
    },
    {
      exactMatch: true,
    },
  )

  useKeyPress(
    ['ctrl.shift.z', 'meta.shift.z'],
    () => {
      if (!isActiveElementValid()) return
      redo()
    },
    {
      exactMatch: true,
    },
  )
}

export default useCanvasKeyPress
