import type { FC } from 'react'
import { Typography } from 'antd'
import {
  type SurveyParagraphPropsType,
  SurveyParagraphDefaultProps,
} from './interface'

const { Paragraph } = Typography

const SurveyParagraph: FC<SurveyParagraphPropsType> = (props) => {
  const { text, isCenter } = { ...SurveyParagraphDefaultProps, ...props }

  const textList = text?.split('\n')

  return (
    <Paragraph
      style={{
        marginBottom: 0,
        textAlign: isCenter ? 'center' : 'start',
      }}
    >
      {textList?.map((t, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {t}
        </span>
      ))}
    </Paragraph>
  )
}

export default SurveyParagraph
