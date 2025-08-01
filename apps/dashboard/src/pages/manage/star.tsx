import { type FC } from 'react'
import { Empty, Spin } from 'antd'
import { useTitle } from 'ahooks'
import SurveyCard from '../../components/SurveyCard'
import ListSearch from '../../components/ListSearch'
import ListPage from '../../components/ListPage'
import useLoadSurveyList from '../../hooks/useLoadSurveyList'

const StaredSurvey: FC = () => {
  useTitle('Survey Dashboard - Stared Surveys')

  const { data = {}, loading } = useLoadSurveyList({ isStar: true })
  const { list = [], total = 0 } = data

  return (
    <div>
      <div className="flex justify-center h-[40px] align-middle leading-[40px] mb-5">
        <div className="w-[200px] font-semibold leading-[40px]">
          <h2>Stared Surveys</h2>
        </div>
        <div className="flex-1 text-right">
          <ListSearch />
        </div>
      </div>
      {loading && (
        <div
          className="flex justify-center items-center"
          style={{ height: '500px' }}
        >
          <Spin />
        </div>
      )}
      {!loading && list.length === 0 && <Empty description="No data" />}
      {!loading && list.length > 0 && (
        <div>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {list.map((survey: any) => (
            <SurveyCard key={survey.id} {...survey} />
          ))}
          <ListPage total={total} children={undefined} />
        </div>
      )}
    </div>
  )
}

export default StaredSurvey
