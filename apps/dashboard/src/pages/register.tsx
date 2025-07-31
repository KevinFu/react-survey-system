import type { FC, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { validateUsername } from '../util'

const Register: FC = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const validateConfirmPassword = (pwd: string, confirm: string) => {
    if (pwd !== confirm) {
      return 'Passwords do not match.'
    }
    return ''
  }

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setUsername(val)
    setUsernameError(validateUsername(val))
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setPassword(val)
    if (confirmPassword) {
      setConfirmPasswordError(validateConfirmPassword(val, confirmPassword))
    } else {
      setConfirmPasswordError('')
    }
  }

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setConfirmPassword(val)
    setConfirmPasswordError(validateConfirmPassword(password, val))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const err = validateUsername(username)
    setUsernameError(err)
    const confirmErr = validateConfirmPassword(password, confirmPassword)
    setConfirmPasswordError(confirmErr)
    if (err || confirmErr) return
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="card w-full max-w-lg bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4 justify-center">Register</h2>
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
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className={`input input-bordered w-full${confirmPasswordError ? ' input-error' : ''}`}
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {confirmPasswordError && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {confirmPasswordError}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Nickname</span>
              </label>
              <input
                type="text"
                placeholder="Enter your nickname"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control w-full flex flex-row gap-2">
              <button className="btn btn-primary flex-1" type="submit">
                Register
              </button>
              <button
                type="button"
                className="btn btn-outline flex-1"
                onClick={() => navigate('/login')}
              >
                Already registered? Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
