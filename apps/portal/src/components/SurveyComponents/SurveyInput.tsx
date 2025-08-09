import { type FC } from 'react'

interface PropsType {
  fe_id: string
  props: {
    title: string
    placeholder?: string
  }
}

const SurveyInput: FC<PropsType> = ({ fe_id, props }) => {
  const { title, placeholder } = props
  return (
    <>
      <p>{title}</p>
      <div className="mb-4 px-2">
        <input
          className="w-[100%] border border-solid border-gray-300 py-1.5 px-3"
          name={fe_id}
          placeholder={placeholder}
        />
      </div>
    </>
  )
}

export default SurveyInput
