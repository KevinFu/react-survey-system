import type { FC } from 'react'

interface SurveyCardProps {
  id: number
  title: string
  description: string
  published: boolean
}

const SurveyCard: FC<SurveyCardProps> = (props) => {
  const { id, title, description, published } = props

  const editSurvey = (id: number) => {
    console.log('edit', id)
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
      <button onClick={() => editSurvey(id)}>Edit</button>
    </li>
  )
}

export default SurveyCard
