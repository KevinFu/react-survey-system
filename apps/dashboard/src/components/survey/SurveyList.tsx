import type { FC } from 'react'
import SurveyCard from './SurveyCard'

const SurveyList: FC = () => {
  const surveyList = [
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
  ]

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
          />
        ))}
      </ul>
    </>
  )
}

export default SurveyList
