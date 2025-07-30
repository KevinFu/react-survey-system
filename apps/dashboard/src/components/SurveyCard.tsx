import { type FC } from 'react'

interface SurveyCardProps {
  id: number
  title: string
  description: string
  published: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
  deleteSurvey: (id: number) => void
  publishSurvey: (id: number) => void
}

const SurveyCard: FC<SurveyCardProps> = ({
  id,
  title,
  description,
  published,
  isStar,
  answerCount,
  createdAt,
  deleteSurvey,
  publishSurvey,
}) => {
  const onDelete = () => {
    deleteSurvey(id)
  }

  const onPublish = () => {
    publishSurvey(id)
  }

  return (
    <li>
      <strong>{title}</strong>
      <span>{description}</span>
      {published ? (
        <span style={{ color: 'green' }}>Published</span>
      ) : (
        <span>unPublished</span>
      )}
      {isStar ? (
        <span style={{ color: 'red' }}>Star</span>
      ) : (
        <span>unStar</span>
      )}
      <span>{answerCount}</span>
      <span>{createdAt}</span>
      <button onClick={onPublish}>Publish</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  )
}

export default SurveyCard
