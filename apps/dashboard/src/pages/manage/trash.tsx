import { useState, type FC } from 'react'
import { EyeOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button, Table, Modal, Tag, Space, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
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

interface SurveyItem {
  id: number
  title: string
  description: string
  published: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
}

const Trash: FC = () => {
  const [surveyList, setSurveyList] = useState<SurveyItem[]>(rawSurveyList)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'single' | 'batch'
    id?: number
  } | null>(null)

  const deleteSurvey = (id: number) => {
    setSurveyList(surveyList.filter((survey) => survey.id !== id))
    message.success('Survey deleted permanently')
  }

  const restoreSurvey = (id: number) => {
    // TODO: Implement restore functionality
    console.log('Restore survey:', id)
    message.success('Survey restored')
  }

  const restoreSelected = () => {
    // TODO: Implement batch restore functionality
    console.log('Restore selected surveys:', selectedRowKeys)
    setSelectedRowKeys([])
    message.success(`${selectedRowKeys.length} surveys restored`)
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
        surveyList.filter((survey) => !selectedRowKeys.includes(survey.id)),
      )
      setSelectedRowKeys([])
      message.success(`${selectedRowKeys.length} surveys deleted permanently`)
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
      return `Are you sure you want to permanently delete ${selectedRowKeys.length} selected survey(s)? This action cannot be undone.`
    }
  }

  const columns: ColumnsType<SurveyItem> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <div className="font-medium text-white">{text}</div>
          {record.isStar && <Tag color="warning">Star</Tag>}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'published',
      key: 'status',
      render: (published) =>
        published ? (
          <Tag color="success" icon={<EyeOutlined />}>
            Published
          </Tag>
        ) : (
          <Tag color="warning" icon={<EyeOutlined />}>
            Unpublished
          </Tag>
        ),
    },
    {
      title: 'Responses',
      dataIndex: 'answerCount',
      key: 'responses',
      render: (count) => <span className="font-mono text-white">{count}</span>,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => <span className="text-sm text-gray-400">{date}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            size="small"
            icon={<ReloadOutlined />}
            className="bg-gray-700 hover:bg-green-600 hover:text-white text-gray-300 transition-all duration-200 ease-in-out"
            onClick={() => restoreSurvey(record.id)}
            title="Restore"
          />
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            className="bg-gray-700 hover:bg-red-600 hover:text-white text-gray-300 transition-all duration-200 ease-in-out"
            onClick={() => confirmDelete('single', record.id)}
            title="Delete Permanently"
          />
        </Space>
      ),
    },
  ]

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys)
    },
  }

  return (
    <>
      <div className="flex items-center mb-2 gap-4">
        <h2 className="text-2xl font-bold mr-4 whitespace-nowrap text-white">
          Trash
        </h2>
        <div className="ml-auto w-full max-w-xs">
          <ListSearch />
        </div>
      </div>
      <div className="flex gap-2 mb-6">
        <Button
          type="default"
          size="small"
          icon={<ReloadOutlined />}
          className="bg-gray-700 hover:bg-green-600 hover:text-white text-gray-300 transition-all duration-200 ease-in-out"
          onClick={restoreSelected}
          disabled={selectedRowKeys.length === 0}
        >
          Restore Selected ({selectedRowKeys.length})
        </Button>
        <Button
          type="default"
          size="small"
          danger
          icon={<DeleteOutlined />}
          className="bg-gray-700 hover:bg-red-600 hover:text-white text-gray-300 transition-all duration-200 ease-in-out"
          onClick={() => confirmDelete('batch')}
          disabled={selectedRowKeys.length === 0}
        >
          Delete Selected ({selectedRowKeys.length})
        </Button>
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={surveyList}
          rowKey="id"
          pagination={false}
          className="bg-gray-800"
          locale={{
            emptyText: (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">
                  No surveys in trash
                </div>
                <p className="text-gray-500">
                  Surveys you delete will appear here
                </p>
              </div>
            ),
          }}
        />
      </div>

      {/* Load More */}
      {surveyList.length > 0 && (
        <div className="text-center mt-6">
          <Button
            type="default"
            size="small"
            className="bg-gray-700 hover:bg-gray-600 text-gray-300"
          >
            Load More
          </Button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        title={getDeleteModalTitle()}
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onOk={executeDelete}
        okText="Delete Permanently"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>{getDeleteModalMessage()}</p>
      </Modal>
    </>
  )
}

export default Trash
