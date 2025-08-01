import { type FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Button, Modal, Tag, Space } from 'antd'
import {
  EditOutlined,
  BarChartOutlined,
  StarOutlined,
  EyeOutlined,
  DeleteOutlined,
  CalendarOutlined,
  MessageOutlined,
  CopyOutlined,
} from '@ant-design/icons'

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
    setShowCopyModal(false)
  }

  return (
    <>
      <Card className="mb-8 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-gray-700 bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Link
              className="text-lg font-semibold text-white hover:text-blue-400 cursor-pointer"
              to={published ? `/survey/statistics/${id}` : `/survey/edit/${id}`}
            >
              <span className="inline-flex items-center gap-1">
                {isStar && <StarOutlined className="text-yellow-400" />}
                {title}
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {published ? (
              <Tag color="success" icon={<EyeOutlined />}>
                Published
              </Tag>
            ) : (
              <Tag color="warning" icon={<EyeOutlined />}>
                Unpublished
              </Tag>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MessageOutlined />
              <span>{answerCount} responses</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <CalendarOutlined />
              <span>{createdAt}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 my-4"></div>

        <div className="flex items-center justify-between">
          <Space>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              className="bg-gray-700 hover:bg-blue-600 hover:text-white text-gray-300 transition-all duration-200 ease-in-out"
              onClick={() => {
                navigate(`/survey/edit/${id}`)
              }}
            >
              Edit Survey
            </Button>
            <Button
              type="text"
              size="small"
              icon={<BarChartOutlined />}
              disabled={!published}
              className="bg-gray-700 hover:bg-green-600 hover:text-white text-gray-300 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                if (published) {
                  navigate(`/survey/statistics/${id}`)
                }
              }}
            >
              Statistics
            </Button>
          </Space>

          <Space>
            {isStar ? (
              <Button
                type="text"
                size="small"
                icon={<StarOutlined className="text-yellow-400" />}
                className="bg-gray-700 hover:bg-yellow-600 hover:text-white text-gray-300 transition-all duration-200 ease-in-out"
              >
                Starred
              </Button>
            ) : (
              <Button
                type="text"
                size="small"
                icon={<StarOutlined />}
                className="bg-gray-700 hover:bg-yellow-600 hover:text-white text-gray-300 transition-all duration-200 ease-in-out"
              >
                Star
              </Button>
            )}
            <Button
              type="text"
              size="small"
              icon={<CopyOutlined />}
              className="bg-gray-700 hover:bg-purple-600 hover:text-white text-gray-300 transition-all duration-200 ease-in-out"
              onClick={() => setShowCopyModal(true)}
            >
              Copy
            </Button>
            <Button
              type="text"
              size="small"
              danger
              icon={<DeleteOutlined />}
              className="bg-gray-700 hover:bg-red-600 hover:text-white text-gray-300 transition-all duration-200 ease-in-out"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </Button>
          </Space>
        </div>
      </Card>

      {/* Copy Modal */}
      <Modal
        title="Copy Survey Link"
        open={showCopyModal}
        onCancel={() => setShowCopyModal(false)}
        onOk={onCopy}
        okText="Copy"
        cancelText="Cancel"
      >
        <p>Are you sure you want to copy the survey link to clipboard?</p>
      </Modal>

      {/* Delete Modal */}
      <Modal
        title="Delete Survey"
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onOk={onDelete}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to delete "{title}"? This action cannot be
          undone.
        </p>
      </Modal>
    </>
  )
}

export default SurveyCard
