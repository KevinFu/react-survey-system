import {
  type FC,
  type ChangeEvent,
  type KeyboardEvent,
  useState,
  useEffect,
} from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constant'

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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  const handleIconClick = () => {
    onSearch()
  }

  const onSearch = () => {
    nav({
      pathname,
      search: value ? `${LIST_SEARCH_PARAM_KEY}=${value}` : '',
    })
  }

  return (
    <label className="input cursor-pointer">
      <MagnifyingGlassIcon
        className="h-5 w-5 opacity-50 hover:opacity-80 transition"
        onClick={handleIconClick}
      />
      <input
        type="search"
        required
        placeholder="Search"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="grow"
      />
    </label>
  )
}

export default ListSearch
