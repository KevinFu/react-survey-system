import { useEffect, type FC } from 'react'
import { Form, Input } from 'antd'
import { type SurveyInfoPropsType } from './interface'

const { TextArea } = Input

const PropComponent: FC<SurveyInfoPropsType> = (props) => {
  const { title, desc, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, desc })
  }, [title, desc, form])

  function handleChange() {
    onChange?.(form.getFieldsValue())
  }

  return (
    <Form
      form={form}
      layout="vertical"
      disabled={disabled}
      onValuesChange={handleChange}
      initialValues={{ title, desc }}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please input survey title' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Desc" name="desc">
        <TextArea />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
