import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Card, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined, IdcardOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { LOGIN_PATHNAME } from '../routers'
import { registerService } from '../services/user'

const Register: FC = () => {
  const nav = useNavigate()
  const [form] = Form.useForm()

  const { run } = useRequest(
    async (values) => {
      const { username, password, nickname } = values
      await registerService(username, password, nickname)
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('Registration successful!')
        nav(LOGIN_PATHNAME)
      },
    },
  )

  const handleSubmit = (values: {
    username: string
    password: string
    confirmPassword: string
    nickname: string
  }) => {
    run(values)
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
                onClick={() => nav('/login')}
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
