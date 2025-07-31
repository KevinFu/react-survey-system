import { useState, type FC } from 'react'
import { EyeIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import ListSearch from '../../components/ListSearch'

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

const Trash: FC = () => {
  const [surveyList, setSurveyList] = useState(rawSurveyList)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'single' | 'batch'
    id?: number
  } | null>(null)

  const deleteSurvey = (id: number) => {
    setSurveyList(surveyList.filter((survey) => survey.id !== id))
  }

  const restoreSurvey = (id: number) => {
    // TODO: Implement restore functionality
    console.log('Restore survey:', id)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(surveyList.map((survey) => survey.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id])
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id))
    }
  }

  const restoreSelected = () => {
    // TODO: Implement batch restore functionality
    console.log('Restore selected surveys:', selectedIds)
    setSelectedIds([])
  }

  const confirmDelete = (type: 'single' | 'batch', id?: number) => {
    setDeleteTarget({ type, id })
    setShowDeleteModal(true)
  }

  const executeDelete = () => {
    if (!deleteTarget) return

    if (deleteTarget.type === 'single' && deleteTarget.id) {
      deleteSurvey(deleteTarget.id)
    } else if (deleteTarget.type === 'batch') {
      setSurveyList(
        surveyList.filter((survey) => !selectedIds.includes(survey.id)),
      )
      setSelectedIds([])
    }

    setShowDeleteModal(false)
    setDeleteTarget(null)
  }

  const getDeleteModalTitle = () => {
    if (!deleteTarget) return ''
    return deleteTarget.type === 'single'
      ? 'Delete Survey'
      : 'Delete Selected Surveys'
  }

  const getDeleteModalMessage = () => {
    if (!deleteTarget) return ''

    if (deleteTarget.type === 'single') {
      const survey = surveyList.find((s) => s.id === deleteTarget.id)
      return `Are you sure you want to permanently delete "${survey?.title}"? This action cannot be undone.`
    } else {
      return `Are you sure you want to permanently delete ${selectedIds.length} selected survey(s)? This action cannot be undone.`
    }
  }

  return (
    <>
      <div className="p-6">
        <div className="flex items-center mb-2 gap-4">
          <h2 className="text-2xl font-bold mr-4 whitespace-nowrap">Trash</h2>
          <div className="ml-auto w-full max-w-xs">
            <ListSearch />
          </div>
        </div>
        <div className="flex gap-2 mb-6">
          <button
            className={`btn btn-outline btn-sm ${selectedIds.length > 0 ? 'btn-primary' : ''}`}
            onClick={restoreSelected}
            disabled={selectedIds.length === 0}
          >
            <ArrowPathIcon className="w-4 h-4 mr-2" />
            Restore Selected ({selectedIds.length})
          </button>
          <button
            className={`btn btn-outline btn-sm btn-error ${selectedIds.length > 0 ? '' : 'btn-disabled'}`}
            onClick={() => confirmDelete('batch')}
            disabled={selectedIds.length === 0}
          >
            <TrashIcon className="w-4 h-4 mr-2" />
            Delete Selected ({selectedIds.length})
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* Table Header */}
            <thead>
              <tr>
                <th className="w-8">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={
                      selectedIds.length === surveyList.length &&
                      surveyList.length > 0
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
                <th>Title</th>
                <th>Status</th>
                <th>Responses</th>
                <th>Created At</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {surveyList.map((survey) => (
                <tr key={survey.id} className="hover">
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={selectedIds.includes(survey.id)}
                      onChange={(e) =>
                        handleSelectItem(survey.id, e.target.checked)
                      }
                    />
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{survey.title}</div>
                      {survey.isStar && (
                        <div className="badge badge-warning badge-xs">Star</div>
                      )}
                    </div>
                  </td>
                  <td>
                    {survey.published ? (
                      <div className="badge badge-success badge-sm gap-1">
                        <EyeIcon className="w-3 h-3" />
                        Published
                      </div>
                    ) : (
                      <div className="badge badge-warning badge-sm gap-1">
                        <EyeIcon className="w-3 h-3" />
                        Unpublished
                      </div>
                    )}
                  </td>
                  <td>
                    <span className="font-mono">{survey.answerCount}</span>
                  </td>
                  <td>
                    <span className="text-sm text-base-content/70">
                      {survey.createdAt}
                    </span>
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button
                        className="btn btn-ghost btn-xs text-info hover:text-info-focus"
                        onClick={() => restoreSurvey(survey.id)}
                        title="Restore"
                      >
                        <ArrowPathIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="btn btn-ghost btn-xs text-error hover:text-error-focus"
                        onClick={() => confirmDelete('single', survey.id)}
                        title="Delete Permanently"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {surveyList.length === 0 && (
          <div className="text-center py-12">
            <div className="text-base-content/50 text-lg mb-4">
              No surveys in trash
            </div>
            <p className="text-base-content/70">
              Surveys you delete will appear here
            </p>
          </div>
        )}

        {/* Load More */}
        {surveyList.length > 0 && (
          <div className="text-center mt-6">
            <button className="btn btn-outline btn-sm">Load More</button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <dialog className={`modal ${showDeleteModal ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg text-error">
            {getDeleteModalTitle()}
          </h3>
          <p className="py-4">{getDeleteModalMessage()}</p>
          <div className="modal-action">
            <button className="btn" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </button>
            <button className="btn btn-error" onClick={executeDelete}>
              Delete Permanently
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

export default Trash
