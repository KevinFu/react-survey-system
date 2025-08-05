import { useEffect, type FC } from 'react'
import { Checkbox, Form, Input, Select } from 'antd'
import { type SurveyTitlePropsType } from './interface'

const PropComponent: FC<SurveyTitlePropsType> = (props) => {
  const { text, level, isCenter, onChange } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter })
  }, [text, level, isCenter, form])

  function handleChange() {
    onChange?.(form.getFieldsValue())
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleChange}
      initialValues={{ text, level, isCenter }}
    >
      <Form.Item
        label="Title Text"
        name="text"
        rules={[{ required: true, message: 'Please input title text' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Level" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>Align Center</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
