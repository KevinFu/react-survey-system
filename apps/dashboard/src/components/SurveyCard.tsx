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
    <div className="px-5 my-5 bg-base-100">
      <div className="flex border-b py-5 border-gray-300">
        <div className="w-[200px]">
          <a className="link link-primary">{title}</a>
        </div>
        <div className="flex-1 text-right">
          {published ? (
            <span className="btn btn-xs btn-info">Published</span>
          ) : (
            <span className="btn btn-xs btn-info">unPublished</span>
          )}
          <span className="px-5">AnswerCount: {answerCount}</span>
          <span>{createdAt}</span>
        </div>
      </div>
      <div className="flex py-5">
        <div className="w-[200px]">
          <button className="btn btn-sm btn-primary mr-4">Edit Survey</button>
          <button className="btn btn-sm btn-primary">Statistics</button>
        </div>
        <div className="flex-1 text-right">
          {isStar ? (
            <button className="btn btn-soft btn-sm btn-outline btn-secondary">
              Star
            </button>
          ) : (
            <button className="btn btn-soft btn-sm">unStar</button>
          )}
          <button className="btn btn-soft btn-sm mx-4" onClick={onPublish}>
            Publish
          </button>
          <button className="btn btn-soft btn-sm" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default SurveyCard
