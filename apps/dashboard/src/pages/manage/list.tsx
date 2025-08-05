import { useEffect, useState, useRef, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Empty, Spin } from 'antd'
import { useDebounceFn, useRequest, useTitle } from 'ahooks'
import SurveyCard from '../../components/SurveyCard'
import ListSearch from '../../components/ListSearch'
import { getSurveyListService } from '../../services/survey'
import { LIST_DEFAULT_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant'

const SurveyList: FC = () => {
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [started, setStarted] = useState(false)

  const haveMore = total > list.length

  const [searchParams] = useSearchParams()
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

  useTitle('Survey Dashboard - My Surveys')

  const { run: load, loading } = useRequest(
    async () => {
      const data = await getSurveyListService({
        page,
        pageSize: LIST_DEFAULT_PAGE_SIZE,
        keyword,
      })
      return data
    },
    {
      manual: true,
      onSuccess: (res) => {
        const { list: l = [], total = 0 } = res
        setList(list.concat(l))
        setTotal(total)
        setPage(page + 1)
      },
    },
  )

  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const loadMoreRefCurrent = loadMoreRef.current
      if (!loadMoreRefCurrent) {
        return
      }
      const { bottom } = loadMoreRefCurrent.getBoundingClientRect()
      if (bottom <= document.body.clientHeight) {
        load()
        setStarted(true)
      }
    },
    { wait: 500 },
  )

  useEffect(() => {
    setStarted(false)
    setList([])
    setPage(1)
    setTotal(0)
  }, [keyword])

  useEffect(() => {
    tryLoadMore()
  }, [searchParams, tryLoadMore])

  useEffect(() => {
    if (haveMore) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [haveMore, searchParams, tryLoadMore])

  const LoadMoreElem = () => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="No Data" />
    if (!haveMore) return <span>No More Data</span>
    return <span>Loading Next Page</span>
  }

  return (
    <div>
      <div className="flex justify-center h-[40px] align-middle leading-[40px] mb-5">
        <div className="w-[200px] font-semibold leading-[40px]">
          <h2>My Surveys</h2>
        </div>
        <div className="flex-1 text-right">
          <ListSearch />
        </div>
      </div>

      <div>
        {list.length > 0 &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          list.map((survey: any) => <SurveyCard key={survey.id} {...survey} />)}
      </div>
      <div
        ref={loadMoreRef}
        className="flex justify-center items-center h-[40px] align-middle leading-[40px]"
      >
        <LoadMoreElem />
      </div>
    </div>
  )
}

export default SurveyList
