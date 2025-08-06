import { type FC } from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'
import useComponentStore from '../../../store/components'

const RightPanel: FC = () => {
  const { selectedId } = useComponentStore((state) => state.components)

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
      children: <PageSetting />,
    },
  ]

  return <Tabs items={tabsItems} activeKey={selectedId ? 'props' : 'setting'} />
}

export default RightPanel
