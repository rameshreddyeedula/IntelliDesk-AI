import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import api from '../../services/api'
import './index.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async event => {
    event.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter email and password.')
      return
    }

    setLoading(true)

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      })

      console.log('Login response:', response.data)

      localStorage.setItem('user', JSON.stringify(response.data.user))

      navigate('/dashboard')
    } catch (error) {
      console.error('Login error:', error)

      if (error.response?.data?.detail) {
        setError(error.response.data.detail)
      } else {
        setError('Login failed. Please check your email and password.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <Link to="/" className="back-home">
            ← Back to home
          </Link>

          <div className="login-content">
            <p className="login-eyebrow">WELCOME BACK</p>

            <h1>Login to IntelliDesk AI</h1>

            <p className="login-description">
              Manage your tasks and improve your productivity with your
              intelligent workspace.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
              </div>

              {error && <p className="login-error">{error}</p>}

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p className="register-text">
              Don't have an account?{' '}
              <Link to="/register">Create an account</Link>
            </p>
          </div>
        </div>

        <div className="login-right">
          <div className="login-card">
            <span className="ai-symbol">✦</span>

            <h2>Work smarter with AI</h2>

            <p>
              Let IntelliDesk AI help you prioritize tasks, understand your
              workload, and stay focused.
            </p>

            <div className="login-stat">
              <strong>82%</strong>
              <span>Average productivity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login