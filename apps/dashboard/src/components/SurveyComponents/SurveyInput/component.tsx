import { type FC } from 'react'
import { Typography, Input } from 'antd'
import { type SurveyInputPropsType, SurveyInputDefaultProps } from './interface'

const { Paragraph } = Typography

const SurveyInput: FC<SurveyInputPropsType> = (props) => {
  const { title, placeholder } = { ...SurveyInputDefaultProps, ...props }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  )
}

export default SurveyInput
