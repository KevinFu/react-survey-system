import { useEffect, type FC } from 'react'
import { Form, Input } from 'antd'
import { type SurveyTextareaPropsType } from './interface'

const { TextArea } = Input

const PropComponent: FC<SurveyTextareaPropsType> = (props) => {
  const { title, placeholder, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder, form])

  function handleChange() {
    onChange?.(form.getFieldsValue())
  }

  return (
    <Form
      form={form}
      layout="vertical"
      disabled={disabled}
      onValuesChange={handleChange}
      initialValues={{ title, placeholder }}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please Textarea title' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Placeholder"
        name="placeholder"
        rules={[{ required: true, message: 'Please Textarea title' }]}
      >
        <TextArea />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
