import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Form, Card, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { loginService } from '../services/user'
import { MANAGE_LIST_PATHNAME } from '../routers'
import { setUserToken } from '../utils/token'

const LOCAL_KEY = 'survey-remember-login'

const Login: FC = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [rememberMe, setRememberMe] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY)
    if (saved) {
      try {
        const { username, password } = JSON.parse(saved)
        form.setFieldsValue({
          username: username || '',
          password: password || '',
        })
      } catch (e) {
        console.log('parse error', e)
      }
    }
  }, [form])

  const { run } = useRequest(
    async (values) => {
      const { username, password } = values
      const data = await loginService(username, password)
      return data
    },
    {
      manual: true,
      onSuccess: (res) => {
        setUserToken(res.token || '')
        message.success('Login successful!')
        navigate(MANAGE_LIST_PATHNAME)
      },
    },
  )

  const handleSubmit = (values: { username: string; password: string }) => {
    run(values)
    if (rememberMe) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(values))
    } else {
      localStorage.removeItem(LOCAL_KEY)
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center py-[100px]">
      <Card className="w-full max-w-lg shadow-xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Login</h2>
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

          <Form.Item>
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            >
              Remember me
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <div className="flex gap-2">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="flex-1"
              >
                Login
              </Button>
              <Button
                size="large"
                className="flex-1"
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
