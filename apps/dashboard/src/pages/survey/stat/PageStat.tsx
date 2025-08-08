import { type FC, useState } from 'react'
import { Typography, Spin, Table, Pagination } from 'antd'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getSurveyStatListService } from '../../../services/stat'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { STAT_PAGE_SIZE } from '../../../constant'

const { Title } = Typography

type PropsType = {
  selectComponentId: string
  setSelectComponentId: (id: string) => void
  setSelectComponentType: (type: string) => void
}

const PageStat: FC<PropsType> = (props: PropsType) => {
  const { selectComponentId, setSelectComponentId, setSelectComponentType } =
    props

  const { id = '' } = useParams()
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE)

  const { loading } = useRequest(
    async () => {
      const res = await getSurveyStatListService(id, { page, pageSize })
      return res
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(res) {
        const { total, list = [] } = res
        setTotal(total)
        setList(list)
      },
    },
  )

  const { componentList } = useGetComponentInfo()
  const columns = componentList.map((c) => {
    const { fe_id, title, props = {}, type } = c

    const colTitle = props!.title || title

    return {
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectComponentId(fe_id)
            setSelectComponentType(type)
          }}
        >
          <span
            style={{
              color: fe_id === selectComponentId ? '#1890ff' : 'inherit',
            }}
          >
            {colTitle}
          </span>
        </div>
      ),
      dataIndex: fe_id,
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataSource = list.map((i: any) => ({ ...i, key: i._id }))
  const TableElem = (
    <>
      <Table
        columns={columns}
        pagination={false}
        scroll={{ x: 800, y: 520 }}
        dataSource={dataSource}
      />
      <div className="text-right my-5">
        <Pagination
          total={total}
          pageSize={pageSize}
          current={page}
          onChange={(page) => setPage(page)}
          onShowSizeChange={(page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
          }}
        />
      </div>
    </>
  )

  return (
    <>
      <Title level={3}>Answer Count: {!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
      {!loading && TableElem}
    </>
  )
}

export default PageStat
