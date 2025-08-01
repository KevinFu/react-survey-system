import { type FC } from 'react'
import { Empty, Spin } from 'antd'
import { useTitle } from 'ahooks'
import SurveyCard from '../../components/SurveyCard'
import ListSearch from '../../components/ListSearch'
import useLoadSurveyList from '../../hooks/useLoadSurveyList'
const SurveyList: FC = () => {
  useTitle('Survey Dashboard - My Surveys')

  const { data = {}, loading } = useLoadSurveyList()
  const { list = [], total = 0 } = data

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
        {loading && (
          <div
            className="flex justify-center items-center h-full"
            style={{ height: '500px' }}
          >
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="No data" />}
        {!loading &&
          list.length > 0 &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          list.map((survey: any) => <SurveyCard key={survey.id} {...survey} />)}
        {!loading && total}
      </div>
      <div>load more</div>
    </div>
  )
}

export default SurveyList
