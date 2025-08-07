import { useState, type ChangeEvent, type FC } from 'react'
import { Button, Input, Space, Typography } from 'antd'
import { EditOutlined, LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import EditToolbar from './EditToolbar'
import usePageInfoStore from '../../../store/pageInfo'

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
            <Button>Save</Button>
            <Button type="primary">Publish</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
