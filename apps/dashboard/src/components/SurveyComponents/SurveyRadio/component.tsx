import { type FC } from 'react'
import { Typography, Radio, Space } from 'antd'
import { type SurveyRadioPropsType, SurveyRadioDefaultProps } from './interface'

const { Paragraph } = Typography

const SurveyRadio: FC<SurveyRadioPropsType> = (props) => {
  const { title, isVertical, options, value } = {
    ...SurveyRadioDefaultProps,
    ...props,
  }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options?.map(({ value, text }) => (
            <Radio key={value} value={value}>
              {text}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default SurveyRadio
