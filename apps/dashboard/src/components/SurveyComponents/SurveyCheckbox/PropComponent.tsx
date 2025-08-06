import { useEffect, type FC } from 'react'
import { Button, Checkbox, Form, Input, Space } from 'antd'
import { type SurveyCheckboxPropsType } from './interface'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'

const PropComponent: FC<SurveyCheckboxPropsType> = (props) => {
  const { title, isVertical, options, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, options })
  }, [title, isVertical, options, form])

  function handleChange() {
    const newValues = form.getFieldsValue() as SurveyCheckboxPropsType
    const { options = [] } = newValues

    options.forEach((opt) => {
      if (!opt.value) opt.value = nanoid(5)
    })

    onChange?.(newValues)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      disabled={disabled}
      onValuesChange={handleChange}
      initialValues={{ title, isVertical, options }}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please input title' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Options">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => (
                <Space key={key} align="baseline">
                  <Form.Item name={[name, 'checked']} valuePropName="checked">
                    <Checkbox />
                  </Form.Item>
                  <Form.Item
                    name={[name, 'text']}
                    rules={[
                      { required: true, message: 'please input option text' },
                      {
                        validator: (_, text) => {
                          const { options = [] } = form.getFieldsValue()
                          let num = 0
                          options.forEach((opt: { text: string }) => {
                            if (opt.text === text) num++
                          })
                          if (num === 1) return Promise.resolve()
                          return Promise.reject(
                            new Error('It duplicates another option'),
                          )
                        },
                      },
                    ]}
                  >
                    <Input placeholder="please input option text" />
                  </Form.Item>
                  {index > 0 && (
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  )}
                </Space>
              ))}

              <Form.Item>
                <Button
                  block
                  type="link"
                  icon={<PlusOutlined />}
                  onClick={() => add({ text: '', value: '', checked: false })}
                >
                  Add
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>Vertical Align</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
