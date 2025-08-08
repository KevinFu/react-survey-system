import { useRef, type FC } from 'react'
import {
  Button,
  Input,
  message,
  Popover,
  QRCode,
  Space,
  Tooltip,
  Typography,
  type InputRef,
} from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'

import usePageInfoStore from '../../../store/pageInfo'

const { Title } = Typography

const StatHeader: FC = () => {
  const { id } = useParams()
  const nav = useNavigate()
  const urlInputRef = useRef<InputRef>(null)
  const { title } = usePageInfoStore((state) => state.pageInfo) || {}

  function copy() {
    const elem = urlInputRef.current
    if (elem === null) return

    elem.select()
    document.execCommand('copy')
    message.success('Copy success')
  }

  function genLinkAndQRCode() {
    const url = `http://localhost:3000/survey/${id}`

    return (
      <Space>
        <Input className="w-[300px]" value={url} ref={urlInputRef} />
        <Tooltip title="Move Down">
          <Button onClick={copy} icon={<CopyOutlined />} />
        </Tooltip>
        <Popover content={<QRCode value={url} />}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }

  return (
    <div className="bg-white border-b border-[#e8e8e8] py-3">
      <div className="flex mx-6">
        <div className="flex-1">
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              Back
            </Button>
            <Title level={5} className="!mb-0">
              {title}
            </Title>
          </Space>
        </div>
        <div className="flex-1 text-center">{genLinkAndQRCode()}</div>
        <div className="flex-1 text-right">
          <Button
            type="primary"
            onClick={() => {
              nav(`/survey/edit/${id}`)
            }}
          >
            Edit Survey
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader
