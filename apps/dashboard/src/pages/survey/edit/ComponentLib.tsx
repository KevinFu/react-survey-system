import { type FC } from 'react'
import { Typography } from 'antd'
import { nanoid } from 'nanoid'

import {
  componentConfGroup,
  type ComponentConfType,
} from '../../../components/SurveyComponents'
import ComponentsStore from '../../../store/componentsReducer'
const { Title } = Typography

function genComponent(c: ComponentConfType) {
  const { title, type, defaultProps, Component } = c
  const addComponent = ComponentsStore((state) => state.addComponent)

  function handleClick() {
    addComponent({
      fe_id: nanoid(),
      title,
      type,
      props: defaultProps,
    })
  }

  console.log(type)

  return (
    <div
      key={type}
      onClick={handleClick}
      className={`m-[12px] p-[12px] border rounded-lg border-solid border-white hover:border-[#d9d9d9] `}
    >
      <div className="pointer-events-none">
        <Component />
      </div>
    </div>
  )
}

const ComponentLib: FC = () => {
  return (
    <>
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
    </>
  )
}

export default ComponentLib
