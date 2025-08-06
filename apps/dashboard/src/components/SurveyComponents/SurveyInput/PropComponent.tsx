import { useEffect, type FC } from 'react'
import { Form, Input } from 'antd'
import { type SurveyInputPropsType } from './interface'

const PropComponent: FC<SurveyInputPropsType> = (props) => {
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
        rules={[{ required: true, message: 'Please input title' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Placeholder"
        name="placeholder"
        rules={[{ required: true, message: 'Please input title' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
