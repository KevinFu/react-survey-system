import React, { FC } from 'react'

type PropsType = {
  text: string
  isCenter?: boolean
}

const Paragraph: FC<PropsType> = ({ text, isCenter }) => {
  const textList = text.split('\n')

  return (
    <p className={isCenter ? 'text-center' : ''}>
      {textList.map((t, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {t}
        </span>
      ))}
    </p>
  )
}

export default Paragraph
