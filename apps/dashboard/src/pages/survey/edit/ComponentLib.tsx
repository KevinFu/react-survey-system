import { type FC } from 'react'
import { Typography } from 'antd'
import { nanoid } from 'nanoid'

import {
  componentConfGroup,
  type ComponentConfType,
} from '../../../components/SurveyComponents'
import useComponentStore from '../../../store/components'
const { Title } = Typography

function genComponent(c: ComponentConfType) {
  const { title, type, defaultProps, Component } = c
  const addComponent = useComponentStore((state) => state.addComponent)

  function handleClick() {
    addComponent({
      fe_id: nanoid(),
      title,
      type,
      props: defaultProps,
      isHidden: false,
      isLocked: false,
    })
  }

  return (
    <div
      key={type}
      onClick={handleClick}
      className={`my-[12px] p-[12px] bg-gray-100 border rounded-lg border-solid border-white hover:border-[#d9d9d9] `}
    >
      <div className="pointer-events-none">
        <Component />
      </div>
    </div>
  )
}

const ComponentLib: FC = () => {
  return (
    <div className="max-h-[680px] overflow-y-auto">
      {componentConfGroup.map((group, idx: number) => {
        const { groupName, components } = group
        return (
          <div key={idx}>
            <Title
              key={idx}
              level={5}
              className={`${idx > 0 ? 'mt-[20px]' : ''}`}
            >
              {groupName}
            </Title>

            <div>{components.map((c) => genComponent(c))}</div>
          </div>
        )
      })}
    </div>
  )
}

export default ComponentLib
