import { useState, type FC } from 'react'
import {
  EyeOutlined,
  DeleteOutlined,
  ReloadOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { Button, Table, Modal, Tag, message, Spin } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useRequest, useTitle } from 'ahooks'
import ListSearch from '../../components/ListSearch'
import ListPage from '../../components/ListPage'
import useLoadSurveyList from '../../hooks/useLoadSurveyList'
import { updateSurveyService } from '../../services/survey'

interface SurveyItem {
  id: string
  title: string
  description: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
}

const Trash: FC = () => {
  useTitle('Survey Dashboard - Trashed Surveys')

  const { data = {}, loading, refresh } = useLoadSurveyList({ isDeleted: true })
  const { list = [], total = 0 } = data
  const [selectedIds, setSelectedIds] = useState<React.Key[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { run: restoreSurvey } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateSurveyService(String(id), { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess: () => {
        message.success('Restore successfully')
        refresh()
        setSelectedIds([])
      },
    },
  )

  const executeDelete = () => {
    // TODO: Implement batch delete functionality
    setShowDeleteModal(false)
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
  ]

  const rowSelection = {
    selectedIds,
    onChange: (newSelectedIds: React.Key[]) => {
      setSelectedIds(newSelectedIds)
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
          onClick={restoreSurvey}
          disabled={selectedIds.length === 0}
        >
          Restore Selected ({selectedIds.length})
        </Button>
        <Button
          type="default"
          size="small"
          danger
          icon={<DeleteOutlined />}
          className="transition-all duration-200 ease-in-out"
          // onClick={() => confirmDelete('batch')}
          disabled={selectedIds.length === 0}
        >
          Delete Selected ({selectedIds.length})
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
        title="Delete Selected Surveys"
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onOk={executeDelete}
        okText="Delete Permanently"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>{`Are you sure you want to permanently delete ${selectedIds.length} selected survey(s)? This action cannot be undone.`}</p>
      </Modal>
    </>
  )
}

export default Trash
