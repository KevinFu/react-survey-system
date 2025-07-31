import type { FC, FormEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { validateUsername } from '../util'

const LOCAL_KEY = 'survey-remember-login'

const Login: FC = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [usernameError, setUsernameError] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY)
    if (saved) {
      try {
        const { username, password } = JSON.parse(saved)
        setUsername(username || '')
        setPassword(password || '')
      } catch (e) {
        console.log('parse error', e)
      }
    }
  }, [])

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setUsername(val)
    setUsernameError(validateUsername(val))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const err = validateUsername(username)
    setUsernameError(err)
    if (err) return
    if (rememberMe) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify({ username, password }))
    } else {
      localStorage.removeItem(LOCAL_KEY)
    }
    // navigate('/dashboard')
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="card w-full max-w-lg bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4 justify-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className={`input input-bordered w-full${usernameError ? ' input-error' : ''}`}
                required
                value={username}
                onChange={handleUsernameChange}
              />
              {usernameError && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {usernameError}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control mb-6 flex flex-row items-center gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label
                htmlFor="rememberMe"
                className="label-text cursor-pointer select-none"
              >
                Remember me
              </label>
            </div>
            <div className="form-control w-full flex flex-row gap-2">
              <button className="btn btn-primary flex-1" type="submit">
                Login
              </button>
              <button
                type="button"
                className="btn btn-outline flex-1"
                onClick={() => navigate('/register')}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
