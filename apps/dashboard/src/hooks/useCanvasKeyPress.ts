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
}

export default useCanvasKeyPress
