import { type FC } from 'react'
import { Typography } from 'antd'
import {
  componentConfGroup,
  type ComponentConfType,
} from '../../../components/SurveyComponents'

const { Title } = Typography

function genComponent(c: ComponentConfType) {
  const { Component } = c
  return (
    <div
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
