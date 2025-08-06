import useComponentStore from '../store/componentsReducer'

const useGetComponentInfo = () => {
  const components = useComponentStore((state) => state.components)
  const { componentList, selectedId, copiedComponent } = components
  const selectedComponent = componentList.find((c) => c.fe_id === selectedId)

  return { componentList, selectedId, selectedComponent, copiedComponent }
}

export default useGetComponentInfo
