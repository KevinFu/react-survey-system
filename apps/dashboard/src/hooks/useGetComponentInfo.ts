import useComponentStore from '../store/componentsReducer'

const useGetComponentInfo = () => {
  const components = useComponentStore((state) => state.components)
  const { componentList, selectedId } = components
  const selectedComponent = componentList.find((c) => c.fe_id === selectedId)

  return { componentList, selectedId, selectedComponent }
}

export default useGetComponentInfo
