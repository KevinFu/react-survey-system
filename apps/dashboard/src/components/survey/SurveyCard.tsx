import { type FC } from 'react'

interface SurveyCardProps {
  id: number
  title: string
  description: string
  published: boolean
  deleteSurvey: (id: number) => void
  publishSurvey: (id: number) => void
}

const SurveyCard: FC<SurveyCardProps> = ({
  id,
  title,
  description,
  published,
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
      <button onClick={onPublish}>Publish</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  )
}

export default SurveyCard
