import { useState, type ChangeEvent, type FC } from 'react'
import { Button, Input, message, Space, Typography } from 'antd'
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import EditToolbar from './EditToolbar'
import usePageInfoStore from '../../../store/pageInfo'
import useComponentStore from '../../../store/components'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
import { updateSurveyService } from '../../../services/survey'

const { Title } = Typography

const TitleElem: FC = () => {
  const [editState, setEditState] = useState(false)
  const { title } = usePageInfoStore((state) => state.pageInfo) || {}
  const changeTitle = usePageInfoStore((state) => state.changePageTitle)

  function onTitleChange(e: ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value.trim()
    if (!newTitle) return
    changeTitle(newTitle)
  }

  if (editState) {
    return (
      <Input
        defaultValue={title}
        onChange={onTitleChange}
        onBlur={() => {
          setEditState(false)
        }}
        onPressEnter={() => {
          setEditState(false)
        }}
      />
    )
  }

  return (
    <Space>
      <Title level={5} className="!mb-0">
        {title}
      </Title>
      <Button
        icon={<EditOutlined />}
        type="text"
        onClick={() => {
          setEditState(true)
        }}
      />
    </Space>
  )
}

const EditHeader: FC = () => {
  const nav = useNavigate()
  const { id = '' } = useParams()
  const pageInfo = usePageInfoStore((state) => state.pageInfo)
  const { componentList } = useComponentStore((state) => state.components)

  const { run: save, loading: saveLoading } = useRequest(
    async () => {
      if (!id) return
      await updateSurveyService(id, { ...pageInfo, componentList })
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('Save success')
      },
    },
  )

  const { run: publish, loading: publishLoading } = useRequest(
    async () => {
      if (!id) return
      await updateSurveyService(id, {
        ...pageInfo,
        componentList,
        isPublish: true,
      })
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('Publish success')
        nav(`/survey/statistics/${id}`)
      },
    },
  )

  useKeyPress(['ctrl.s', 'meta.s'], (e) => {
    e.preventDefault()
    if (!saveLoading) save()
  })

  useDebounceEffect(
    () => {
      save()
    },
    [pageInfo, componentList],
    { wait: 500 },
  )

  return (
    <div className="bg-[#fff] p-[12px] border-x-0 border-t-0 border-solid border-b-[#e8e8e8]">
      <div className="flex mx-[24px]">
        <div className="flex-1">
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              Back
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className="flex-1 text-center">
          <EditToolbar />
        </div>
        <div className="flex-1 text-right">
          <Space>
            <Button
              onClick={save}
              disabled={saveLoading}
              icon={saveLoading && <LoadingOutlined />}
            >
              Save
            </Button>
            <Button
              type="primary"
              onClick={publish}
              disabled={publishLoading}
              icon={publishLoading && <LoadingOutlined />}
            >
              Publish
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
