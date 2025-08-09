import React, { FC } from 'react'

type PropsType = {
  fe_id: string
  props: {
    title: string
    placeholder?: string
  }
}

const QuestionTextarea: FC<PropsType> = ({ fe_id, props }) => {
  const { title, placeholder = '' } = props

  return (
    <>
      <p>{title}</p>
      <div className="mb-4 px-1.5">
        <textarea
          rows={5}
          name={fe_id}
          placeholder={placeholder}
          className="w-[100%] border border-solid border-gray-400 px-3 py-1.5"
        />
      </div>
    </>
  )
}

export default QuestionTextarea
