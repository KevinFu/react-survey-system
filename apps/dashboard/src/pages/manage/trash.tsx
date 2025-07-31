import { useState, type FC } from 'react'
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline'

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
  const [surveyList] = useState(rawSurveyList)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Trash</h2>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm">
            <EyeIcon className="w-4 h-4 mr-2" />
            View All
          </button>
          <button className="btn btn-outline btn-sm">
            <TrashIcon className="w-4 h-4 mr-2" />
            Empty Trash
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Table Header */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Responses</th>
              <th>Created At</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {surveyList.map((survey) => (
              <tr key={survey.id} className="hover">
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
    </div>
  )
}

export default Trash
