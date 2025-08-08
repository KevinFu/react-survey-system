import { useEffect, useState, type FC } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from 'antd'
import { useRequest } from 'ahooks'
import { getComponentStatService } from '../../../services/stat'
import { getComponentConfByType } from '../../../components/SurveyComponents'

const { Title } = Typography

type PropsType = {
  selectComponentId: string
  selectComponentType: string
}

const ChartStat: FC<PropsType> = (props: PropsType) => {
  const { selectComponentId, selectComponentType } = props
  const { id = '' } = useParams()

  const [stat, setStat] = useState([])
  const { run } = useRequest(
    async (questionId, componentId) =>
      await getComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess(res) {
        setStat(res.stat)
      },
    },
  )

  useEffect(() => {
    if (selectComponentId) run(id, selectComponentId)
  }, [id, run, selectComponentId])

  function genStatElem() {
    if (!selectComponentId) return <div>No Selected Component</div>

    const { StatComponent } = getComponentConfByType(selectComponentType) || {}
    if (StatComponent == null) return <div>No Chart</div>

    return <StatComponent stat={stat} />
  }

  return (
    <>
      <Title level={3}>Chart Stat</Title>
      <div>{genStatElem()}</div>
    </>
  )
}

export default ChartStat
