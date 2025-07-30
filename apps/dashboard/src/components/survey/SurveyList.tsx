import { useState, type FC } from 'react'
import SurveyCard from './SurveyCard'

const SurveyList: FC = () => {
  const [surveyList, setSurveyList] = useState([
    {
      id: 1,
      title: 'Survey 1',
      description: 'Description 1',
      published: true,
    },
    {
      id: 2,
      title: 'Survey 2',
      description: 'Description 2',
      published: false,
    },
    {
      id: 3,
      title: 'Survey 3',
      description: 'Description 3',
      published: true,
    },
  ])

  const addSurvey = () => {
    const newId = Math.random().toString().slice(-2)
    setSurveyList([
      ...surveyList,
      {
        id: Number(newId),
        title: 'Survey ' + newId,
        description: 'Description ' + newId,
        published: true,
      },
    ])
  }

  const publishSurvey = (id: number) => {
    setSurveyList(
      surveyList.map((survey) =>
        survey.id === id ? { ...survey, published: !survey.published } : survey,
      ),
    )
  }

  const deleteSurvey = (id: number) => {
    setSurveyList(surveyList.filter((survey) => survey.id !== id))
  }

  return (
    <>
      <h1>Survey List Page</h1>
      <ul>
        {surveyList.map(({ id, title, description, published }) => (
          <SurveyCard
            key={id}
            id={id}
            title={title}
            description={description}
            published={published}
            deleteSurvey={deleteSurvey}
            publishSurvey={publishSurvey}
          />
        ))}
      </ul>
      <div>
        <button onClick={addSurvey}>Add Survey</button>
      </div>
    </>
  )
}

export default SurveyList
