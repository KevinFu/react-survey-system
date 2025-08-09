import React, { FC } from 'react'

type PropsType = {
  text: string
  level: number
  isCenter?: boolean
}

const SurveyTitle: FC<PropsType> = ({ text, level, isCenter }) => {
  const style = isCenter ? 'text-center' : ''

  if (level === 1) return <h1 className={style}>{text}</h1>
  if (level === 2) return <h2 className={style}>{text}</h2>
  if (level === 3) return <h3 className={style}>{text}</h3>

  return null
}

export default SurveyTitle
