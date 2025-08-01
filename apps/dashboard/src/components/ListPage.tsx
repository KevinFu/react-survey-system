import { type FC, type ReactNode } from 'react'
import { Pagination } from 'antd'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'

// 假设的常量值
const LIST_PAGE_PARAM_KEY = 'page'
const LIST_PAGE_SIZE_PARAM_KEY = 'pageSize'
const LIST_DEFAULT_PAGE_SIZE = 10

interface ListPageProps {
  total: number
  pageSize?: number
  children: ReactNode
}

const ListPage: FC<ListPageProps> = ({
  total,
  pageSize: propPageSize,
  children,
}) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  // 从URL参数获取页码，默认为1
  const currentPage = Number(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
  // 从URL参数获取每页大小，优先使用props中的值，其次是URL参数，最后是默认值
  const pageSize =
    propPageSize ||
    Number(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') ||
    LIST_DEFAULT_PAGE_SIZE

  const handlePageChange = (page: number, newPageSize?: number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    if (newPageSize) {
      newSearchParams.set(LIST_PAGE_SIZE_PARAM_KEY, newPageSize.toString())
    }

    navigate({
      pathname: location.pathname,
      search: newSearchParams.toString(),
    })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto mb-4">{children}</div>
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={handlePageChange}
          showSizeChanger
          pageSizeOptions={['10', '20', '50', '100']}
          className="dark-pagination"
        />
      </div>
    </div>
  )
}

export default ListPage
