import { useState, type FC } from 'react'
import {
  EyeOutlined,
  DeleteOutlined,
  ReloadOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { Button, Table, Modal, Tag, Space, message, Spin } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useTitle } from 'ahooks'
import ListSearch from '../../components/ListSearch'
import ListPage from '../../components/ListPage'
import useLoadSurveyList from '../../hooks/useLoadSurveyList'
interface SurveyItem {
  id: number
  title: string
  description: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
}

const Trash: FC = () => {
  useTitle('Survey Dashboard - Trashed Surveys')

  const { data = {}, loading } = useLoadSurveyList({ isDeleted: true })
  const { list = [], total = 0 } = data
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'single' | 'batch'
    id?: number
  } | null>(null)

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
    // TODO: Implement batch delete functionality

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
      const survey = list.find(
        (s: { id: number | undefined }) => s.id === deleteTarget.id,
      )
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
          <div className="font-medium">{text}</div>
          {record.isStar && <StarOutlined />}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isPublished',
      key: 'status',
      render: (isPublished) =>
        isPublished ? (
          <Tag color="success" icon={<EyeOutlined />}>
            Published
          </Tag>
        ) : (
          <Tag color="warning" icon={<EyeOutlined />}>
            UnPublished
          </Tag>
        ),
    },
    {
      title: 'Responses',
      dataIndex: 'answerCount',
      key: 'responses',
      render: (count) => <span className="font-mono">{count}</span>,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => <span className="text-sm">{date}</span>,
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
            className="transition-all duration-200 ease-in-out"
            onClick={() => restoreSurvey(record.id)}
            title="Restore"
          />
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            className="transition-all duration-200 ease-in-out"
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
      <div className="flex justify-center h-[40px] align-middle leading-[40px] mb-5">
        <div className="w-[200px] font-semibold leading-[40px]">
          <h2>Trashed Surveys</h2>
        </div>
        <div className="flex-1 text-right">
          <ListSearch />
        </div>
      </div>
      <div className="flex gap-2 mb-6">
        <Button
          type="default"
          size="small"
          icon={<ReloadOutlined />}
          className="transition-all duration-200 ease-in-out"
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
          className="transition-all duration-200 ease-in-out"
          onClick={() => confirmDelete('batch')}
          disabled={selectedRowKeys.length === 0}
        >
          Delete Selected ({selectedRowKeys.length})
        </Button>
      </div>

      <div className="rounded-lg p-4">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={list}
          rowKey="id"
          pagination={false}
          className=""
          locale={{
            emptyText: (
              <div className="text-center py-12">
                <div className="text-lg mb-4">No surveys in trash</div>
                <p>Surveys you delete will appear here</p>
              </div>
            ),
          }}
        />

        {loading && (
          <div
            className="flex justify-center items-center"
            style={{ height: '500px' }}
          >
            <Spin />
          </div>
        )}
        <ListPage total={total} children={undefined} />
      </div>

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
