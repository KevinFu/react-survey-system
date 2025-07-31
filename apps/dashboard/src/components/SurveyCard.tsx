import { type FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  PencilIcon,
  ChartBarIcon,
  StarIcon,
  EyeIcon,
  TrashIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline'

interface SurveyCardProps {
  id: number
  title: string
  description: string
  published: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
  deleteSurvey: (id: number) => void
}

const SurveyCard: FC<SurveyCardProps> = ({
  id,
  title,
  published,
  isStar,
  answerCount,
  createdAt,
  deleteSurvey,
}) => {
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showCopyModal, setShowCopyModal] = useState(false)

  const onDelete = () => {
    deleteSurvey(id)
    setShowDeleteModal(false)
  }

  const onCopy = () => {
    // TODO
  }

  return (
    <>
      <div className="card bg-base-300 mb-8 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-transparent hover:border-base-content/10">
        <div className="card-body p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Link
                className="text-lg font-semibold text-base-content/80 hover:text-primary cursor-pointer"
                to={
                  published ? `/survey/statistics/${id}` : `/survey/edit/${id}`
                }
              >
                <span className="inline-flex items-center gap-1">
                  {isStar && <StarIcon className="w-4 h-4 fill-current" />}
                  {title}
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {published ? (
                <span className="badge badge-success gap-2">
                  <EyeIcon className="w-3 h-3" />
                  Published
                </span>
              ) : (
                <span className="badge badge-warning gap-2">
                  <EyeIcon className="w-3 h-3" />
                  Unpublished
                </span>
              )}
              <div className="flex items-center gap-2 text-sm text-base-content/70">
                <ChatBubbleLeftRightIcon className="w-4 h-4" />
                <span>{answerCount} responses</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-base-content/70">
                <CalendarIcon className="w-4 h-4" />
                <span>{createdAt}</span>
              </div>
            </div>
          </div>

          <div className="divider my-2"></div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                className="btn btn-ghost btn-sm text-base-content/70 hover:text-primary"
                onClick={() => {
                  navigate(`/survey/edit/${id}`)
                }}
              >
                <PencilIcon className="w-4 h-4" />
                Edit Survey
              </button>
              <button
                className={`btn btn-ghost btn-sm ${
                  published
                    ? 'text-base-content/70 hover:text-info'
                    : 'text-base-content/30 cursor-not-allowed'
                }`}
                onClick={() => {
                  if (published) {
                    navigate(`/survey/statistics/${id}`)
                  }
                }}
                disabled={!published}
              >
                <ChartBarIcon className="w-4 h-4" />
                Statistics
              </button>
            </div>

            <div className="flex items-center gap-2">
              {isStar ? (
                <button className="btn btn-ghost btn-sm gap-2 text-warning hover:text-warning-focus">
                  <StarIcon className="w-4 h-4 fill-current" />
                  Starred
                </button>
              ) : (
                <button className="btn btn-ghost btn-sm gap-2 text-base-content/70 hover:text-warning">
                  <StarIcon className="w-4 h-4" />
                  Star
                </button>
              )}
              <button
                className="btn btn-ghost btn-sm gap-2 text-success hover:text-success-focus"
                onClick={() => setShowCopyModal(true)}
              >
                <ClipboardDocumentIcon className="w-4 h-4" />
                Copy
              </button>
              <button
                className="btn btn-ghost btn-sm gap-2 text-error hover:text-error-focus"
                onClick={() => setShowDeleteModal(true)}
              >
                <TrashIcon className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copy Modal */}
      <dialog className={`modal ${showCopyModal ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Copy Survey Link</h3>
          <p className="py-4">
            Are you sure you want to copy the survey link to clipboard?
          </p>
          <div className="modal-action">
            <button className="btn" onClick={() => setShowCopyModal(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={onCopy}>
              Copy
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setShowCopyModal(false)}>close</button>
        </form>
      </dialog>

      {/* Delete Modal */}
      <dialog className={`modal ${showDeleteModal ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Survey</h3>
          <p className="py-4">
            Are you sure you want to delete "{title}"? This action cannot be
            undone.
          </p>
          <div className="modal-action">
            <button className="btn" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </button>
            <button className="btn btn-error" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setShowDeleteModal(false)}>close</button>
        </form>
      </dialog>
    </>
  )
}

export default SurveyCard
