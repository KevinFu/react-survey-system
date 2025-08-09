'use client'

import React, { FC, useEffect, useState } from 'react'

type PropsType = {
  fe_id: string
  props: {
    title: string
    isVertical?: boolean
    list: Array<{
      value: string
      text: string
      checked: boolean
    }>
  }
}

const SurveyCheckbox: FC<PropsType> = ({ fe_id, props }) => {
  const { title, isVertical, list = [] } = props

  const [selectedValues, setSelectedValues] = useState<string[]>([])

  useEffect(() => {
    list.forEach((item) => {
      const { value, checked } = item
      if (checked) {
        setSelectedValues((selectedValues) => selectedValues.concat(value))
      }
    })
  }, [list])

  function toggleChecked(value: string) {
    if (selectedValues.includes(value)) {
      setSelectedValues((selectedValues) =>
        selectedValues.filter((v) => v !== value),
      )
    } else {
      setSelectedValues(selectedValues.concat(value))
    }
  }

  return (
    <>
      <p>{title}</p>

      <input type="hidden" name={fe_id} value={selectedValues.toString()} />

      <ul className="p-0 list-none">
        {list.map((item) => {
          const { value, text } = item

          return (
            <li
              key={value}
              className={isVertical ? 'mt-2.5' : 'inline-block mr-2.5'}
            >
              <label>
                <input
                  type="checkbox"
                  checked={selectedValues.includes(value)}
                  onChange={() => toggleChecked(value)}
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

export default SurveyCheckbox
