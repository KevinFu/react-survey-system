import type { FC } from 'react'
import { Typography } from 'antd'
import { type SurveyInfoPropsType, SurveyInfoDefaultProps } from './interface'

const { Title, Paragraph } = Typography

const SurveyTitle: FC<SurveyInfoPropsType> = (props) => {
  const { title, desc } = { ...SurveyInfoDefaultProps, ...props }

  const descList = desc.split('\n')

  return (
    <div>
      <Title
        style={{
          marginBottom: 0,
          fontSize: '24px',
          textAlign: 'center',
        }}
      >
        {title}
      </Title>
      <Paragraph className="text-center">
        {descList.map((t, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {t}
          </span>
        ))}
      </Paragraph>
    </div>
  )
}

export default SurveyTitle
