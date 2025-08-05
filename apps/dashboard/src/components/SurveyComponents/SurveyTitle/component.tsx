import type { FC } from 'react'
import { Typography } from 'antd'
import { type SurveyTitlePropsType, SurveyTitleDefaultProps } from './interface'

const { Title } = Typography

const SurveyTitle: FC<SurveyTitlePropsType> = (props) => {
  const { text, level, isCenter } = { ...SurveyTitleDefaultProps, ...props }

  const genFontSize = (level?: number) => {
    if (level === 1) return '24px'
    if (level === 2) return '20px'
    if (level === 3) return '16px'

    return '16px'
  }

  return (
    <Title
      level={level}
      style={{
        marginBottom: 0,
        fontSize: genFontSize(level),
        textAlign: isCenter ? 'center' : 'start',
      }}
    >
      {text}
    </Title>
  )
}

export default SurveyTitle
