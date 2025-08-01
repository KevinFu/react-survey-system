import { type FC, type ChangeEvent, useState, useEffect } from 'react'
import { Input } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constant'

const { Search } = Input

const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const [value, setSearchValue] = useState('')

  useEffect(() => {
    const curValue = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setSearchValue(curValue)
  }, [searchParams])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearchValue(newValue)
    if (newValue === '') {
      nav({ pathname, search: '' })
    }
  }

  const onSearch = () => {
    nav({
      pathname,
      search: value ? `${LIST_SEARCH_PARAM_KEY}=${value}` : '',
    })
  }

  return (
    <Search
      placeholder="Search surveys..."
      value={value}
      onChange={handleChange}
      onSearch={onSearch}
      style={{ width: 300 }}
      size="middle"
      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
    />
  )
}

export default ListSearch
