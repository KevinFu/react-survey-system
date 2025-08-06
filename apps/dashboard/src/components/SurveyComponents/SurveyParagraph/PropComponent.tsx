import { useEffect, type FC } from 'react'
import { Checkbox, Form, Input } from 'antd'
import { type SurveyParagraphPropsType } from './interface'

const { TextArea } = Input

const PropComponent: FC<SurveyParagraphPropsType> = (props) => {
  const { text, isCenter, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter, form])

  function handleChange() {
    onChange?.(form.getFieldsValue())
  }

  return (
    <Form
      form={form}
      layout="vertical"
      disabled={disabled}
      onValuesChange={handleChange}
      initialValues={{ text, isCenter }}
    >
      <Form.Item
        label="Paragraph Text"
        name="text"
        rules={[{ required: true, message: 'Please input paragraph text' }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>Align Center</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
