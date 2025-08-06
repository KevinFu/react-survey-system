import { type FC } from 'react'
import { Typography, Checkbox, Space } from 'antd'
import {
  type SurveyCheckboxPropsType,
  SurveyCheckboxDefaultProps,
} from './interface'

const { Paragraph } = Typography

const SurveyCheckbox: FC<SurveyCheckboxPropsType> = (props) => {
  const { title, isVertical, options } = {
    ...SurveyCheckboxDefaultProps,
    ...props,
  }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {options?.map(({ value, text, checked }) => (
          <Checkbox key={value} value={value} checked={checked}>
            {text}
          </Checkbox>
        ))}
      </Space>
    </div>
  )
}

export default SurveyCheckbox
