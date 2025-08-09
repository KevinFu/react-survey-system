import React, { FC } from 'react'

interface PropsType {
  fe_id: string
  props: {
    title: string
    options: Array<{
      value: string
      text: string
    }>
    value: string
    isVertical: boolean
  }
}

const SurveyRadio: FC<PropsType> = ({ fe_id, props }) => {
  const { title, options = [], value, isVertical } = props

  return (
    <>
      <p>{title}</p>
      <ul className="">
        {options.map((opt) => {
          const { value: val, text } = opt

          return (
            <li
              key={val}
              className={isVertical ? 'mb-2.5' : 'inline-block mr-2.5'}
            >
              <label>
                <input
                  type="radio"
                  name={fe_id}
                  value={val}
                  defaultChecked={val === value}
                />
                {text}
              </label>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default SurveyRadio
