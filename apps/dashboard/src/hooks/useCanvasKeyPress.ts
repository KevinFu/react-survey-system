import { useKeyPress } from 'ahooks'
import ComponentsStore from '../store/componentsReducer'

function isActiveElementValid() {
  return document.activeElement === document.body
}
const useCanvasKeyPress = () => {
  const removeSelectedComponent = ComponentsStore(
    (state) => state.removeSelectedComponent,
  )
  const copyComponent = ComponentsStore((state) => state.copyComponent)
  const pasteCopiedComponent = ComponentsStore(
    (state) => state.pasteCopiedComponent,
  )
  const selectPrevComponent = ComponentsStore(
    (state) => state.selectPrevComponent,
  )
  const selectNextComponent = ComponentsStore(
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
