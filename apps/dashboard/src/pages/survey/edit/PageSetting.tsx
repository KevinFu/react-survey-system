import { useEffect, type FC } from 'react'
import usePageInfoStore from '../../../store/pageInfo'
import { Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'

const { TextArea } = Input
const PageSetting: FC = () => {
  const [form] = useForm()
  const pageInfo = usePageInfoStore((state) => state.pageInfo)
  const resetPageInfo = usePageInfoStore((state) => state.resetPageInfo)

  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [form, pageInfo])

  function handleChange() {
    resetPageInfo(form.getFieldsValue())
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onChange={handleChange}
      initialValues={pageInfo ?? undefined}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please input page title' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="desc"
        rules={[{ required: true, message: 'Please input page description' }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item
        label="CSS"
        name="css"
        rules={[{ required: true, message: 'Please input page css' }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item
        label="Javascript"
        name="js"
        rules={[{ required: true, message: 'Please input page javascript' }]}
      >
        <TextArea />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
