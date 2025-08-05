import useComponentStore from '../store/componentsReducer'

const useGetComponentInfo = () => {
  const components = useComponentStore((state) => state.components)
  const { componentList } = components

  return { componentList }
}

export default useGetComponentInfo
