import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import api from '../../services/api'
import './index.css'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async event => {
    event.preventDefault()
    setError('')

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.')
      return
    }

    setLoading(true)

    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
      })

      console.log('Registration response:', response.data)

      alert('Registration successful! Please login.')

      navigate('/login')
    } catch (error) {
      console.error('Registration error:', error)

      if (error.response) {
        setError(
          error.response.data.detail || 'Registration failed. Please try again.',
        )
      } else {
        setError('Unable to connect to server.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-left">
          <Link to="/" className="back-home">
            ← Back to home
          </Link>

          <div className="register-content">
            <p className="register-eyebrow">GET STARTED</p>

            <h1>Create your IntelliDesk account</h1>

            <p className="register-description">
              Create your workspace and start managing your productivity with
              AI.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={event => setName(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="register-email">Email</label>

                <input
                  id="register-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="register-password">Password</label>

                <input
                  id="register-password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>

                <input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={event => setConfirmPassword(event.target.value)}
                />
              </div>

              {error && <p className="register-error">{error}</p>}

              <button
                type="submit"
                className="register-button"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <p className="login-text">
              Already have an account?{' '}
              <Link to="/login">Login here</Link>
            </p>
          </div>
        </div>

        <div className="register-right">
          <div className="register-card">
            <span className="ai-symbol">✦</span>

            <h2>Your intelligent workspace</h2>

            <p>
              Organize your tasks, discover what needs attention, and use AI
              to work more efficiently.
            </p>

            <div className="benefit">
              <span>✓</span>
              <p>Smart task management</p>
            </div>

            <div className="benefit">
              <span>✓</span>
              <p>AI-powered task analysis</p>
            </div>

            <div className="benefit">
              <span>✓</span>
              <p>Productivity analytics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register