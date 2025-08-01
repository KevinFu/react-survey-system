import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Card, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined, IdcardOutlined } from '@ant-design/icons'

const Register: FC = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const handleSubmit = (values: {
    username: string
    password: string
    confirmPassword: string
    nickname: string
  }) => {
    console.log('Registration values:', values)
    message.success('Registration successful!')
    navigate('/login')
  }

  return (
    <div className="flex flex-1 items-center justify-center py-[50px]">
      <Card className="w-full max-w-lg shadow-xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Register</h2>
        </div>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'Please input your username!' },
              {
                pattern: /^[a-zA-Z][\w]{4,19}$/,
                message:
                  'Username must be 5-20 characters, start with a letter, and only contain letters, numbers, and underscores.',
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter your username"
              prefix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              size="large"
              placeholder="Enter your password"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Passwords do not match!'))
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Confirm your password"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item label="Nickname">
            <Input
              size="large"
              placeholder="Enter your nickname"
              prefix={<IdcardOutlined />}
              required
            />
          </Form.Item>

          <Form.Item>
            <div className="flex gap-2">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="flex-1"
              >
                Register
              </Button>
              <Button
                size="large"
                className="flex-1"
                onClick={() => navigate('/login')}
              >
                Already registered? Login
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Register
