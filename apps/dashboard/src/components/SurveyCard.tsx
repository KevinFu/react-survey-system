import { type FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Button, Modal, Tag, Space, message } from 'antd'
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
import { useRequest } from 'ahooks'
import { updateSurveyService, duplicateSurveyService } from '../services/survey'

interface SurveyCardProps {
  id: string
  title: string
  description: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
  deleteSurvey: (id: string) => void
}

const SurveyCard: FC<SurveyCardProps> = (props) => {
  const { id, title, isPublished, isStar, answerCount, createdAt } = props
  const navigate = useNavigate()
  const [isStared, setIsStared] = useState(isStar)
  const [isDeleted, setIsDeleted] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showCopyModal, setShowCopyModal] = useState(false)

  const { loading: starLoading, run: starSurvey } = useRequest(
    async () => {
      await updateSurveyService(id, { isStar: !isStared })
    },
    {
      manual: true,
      onSuccess: () => {
        setIsStared(!isStared)
        message.success(`${isStared ? 'UnStar' : 'Stared'} successfully`)
      },
    },
  )

  const { loading: duplicateLoading, run: duplicateSurvey } = useRequest(
    async () => await duplicateSurveyService(id),
    {
      manual: true,
      onSuccess: (res) => {
        message.success('Duplicate successfully')
        navigate(`/survey/edit/${res.id}`)
      },
    },
  )

  const { loading: deleteLoading, run: deleteSurvey } = useRequest(
    async () => {
      await updateSurveyService(id, { isDeleted: true })
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('Delete successfully')
        setIsDeleted(true)
        setShowDeleteModal(false)
      },
    },
  )

  if (isDeleted) return

  return (
    <>
      <Card className="mb-8 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Link
              className="text-lg font-semibold cursor-pointer"
              to={isPublished ? `/survey/stat/${id}` : `/survey/edit/${id}`}
            >
              <span className="inline-flex items-center gap-1">
                {isStared && <StarOutlined />}
                {title}
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {isPublished ? (
              <Tag color="success" icon={<EyeOutlined />}>
                Published
              </Tag>
            ) : (
              <Tag color="warning" icon={<EyeOutlined />}>
                UnPublished
              </Tag>
            )}
            <div className="flex items-center gap-2 text-sm">
              <MessageOutlined />
              <span>{answerCount} responses</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CalendarOutlined />
              <span>{createdAt}</span>
            </div>
          </div>
        </div>

        <div className="border-t my-4"></div>

        <div className="flex items-center justify-between">
          <Space>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              className="transition-all duration-200 ease-in-out"
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
              disabled={!isPublished}
              className="transition-all duration-200 ease-in-out disabled:opacity-80 disabled:cursor-not-allowed"
              onClick={() => {
                if (isPublished) {
                  navigate(`/survey/stat/${id}`)
                }
              }}
            >
              Statistics
            </Button>
          </Space>

          <Space>
            <Button
              type="text"
              size="small"
              icon={<StarOutlined />}
              className="transition-all duration-200 ease-in-out"
              disabled={starLoading}
              onClick={() => starSurvey()}
            >
              {isStared ? 'UnStar' : 'Stared'}
            </Button>
            <Button
              type="text"
              size="small"
              icon={<CopyOutlined />}
              disabled={duplicateLoading}
              className="transition-all duration-200 ease-in-out"
              onClick={() => setShowCopyModal(true)}
            >
              Duplicate
            </Button>
            <Button
              type="text"
              size="small"
              danger
              disabled={deleteLoading}
              icon={<DeleteOutlined />}
              className="transition-all duration-200 ease-in-out"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </Button>
          </Space>
        </div>
      </Card>

      {/* Copy Modal */}
      <Modal
        title="Duplicate Survey"
        open={showCopyModal}
        onCancel={() => setShowCopyModal(false)}
        onOk={duplicateSurvey}
        okText="Copy"
        cancelText="Cancel"
      >
        <p>Are you sure you want to duplicate the survey?</p>
      </Modal>

      {/* Delete Modal */}
      <Modal
        title="Delete Survey"
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onOk={deleteSurvey}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to move "{title}" to trash ?</p>
      </Modal>
    </>
  )
}

export default SurveyCard
