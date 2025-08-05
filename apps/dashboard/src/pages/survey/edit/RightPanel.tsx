import { type FC } from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProp from './ComponentProp'

const RightPanel: FC = () => {
  const tabsItems = [
    {
      key: 'props',
      label: (
        <span>
          <FileTextOutlined />
          Props
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: 'setting',
      label: (
        <span>
          <SettingOutlined />
          Page Setting
        </span>
      ),
      children: <>Page setting</>,
    },
  ]

  return <Tabs items={tabsItems} defaultActiveKey="props" />
}

export default RightPanel
