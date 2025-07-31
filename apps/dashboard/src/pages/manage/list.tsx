import { useState, type FC } from 'react'
import SurveyCard from '../../components/SurveyCard'

const rawSurveyList = [
  {
    id: 1,
    title: 'Survey 1',
    description: 'Description 1',
    published: true,
    isStar: true,
    answerCount: 100,
    createdAt: '2021-01-01',
  },
  {
    id: 2,
    title: 'Survey 2',
    description: 'Description 2',
    published: false,
    isStar: false,
    answerCount: 200,
    createdAt: '2021-01-02',
  },
  {
    id: 3,
    title: 'Survey 3',
    description: 'Description 3',
    published: true,
    isStar: false,
    answerCount: 300,
    createdAt: '2021-01-03',
  },
]

const SurveyList: FC = () => {
  const [surveyList, setSurveyList] = useState(rawSurveyList)

  const addSurvey = () => {
    const newId = Math.random().toString().slice(-2)
    setSurveyList([
      ...surveyList,
      {
        id: Number(newId),
        title: 'Survey ' + newId,
        description: 'Description ' + newId,
        published: true,
        isStar: false,
        answerCount: 0,
        createdAt: new Date().toISOString(),
      },
    ])
  }

  const deleteSurvey = (id: number) => {
    setSurveyList(surveyList.filter((survey) => survey.id !== id))
  }

  return (
    <div>
      <div className="flex justify-center h-[40px] align-middle leading-[40px]">
        <div className="w-[100px] font-semibold leading-[40px]">
          <h3 className="">My Survey</h3>
        </div>
        <div className="flex-1 text-right">Search</div>
      </div>

      <div>
        {surveyList.map((survey) => (
          <SurveyCard key={survey.id} {...survey} deleteSurvey={deleteSurvey} />
        ))}
      </div>
      <div>
        <button onClick={addSurvey}>Add Survey</button>
      </div>
      <div>load more</div>
    </div>
  )
}

export default SurveyList
