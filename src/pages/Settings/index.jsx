import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './index.css'

const Settings = () => {
  const [notifications, setNotifications] = useState(true)
  const [aiSuggestions, setAiSuggestions] = useState(true)

  const navigate = useNavigate()

  const [user] = useState(() => {
    const savedUser = localStorage.getItem('user')

    return savedUser ? JSON.parse(savedUser) : null
  })

  const userName = user?.name || 'Ramesh'
  const userEmail = user?.email || 'Not available'
  const userInitial = userName.charAt(0).toUpperCase()

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="settings-page">
      <aside className="settings-sidebar">
        <div className="settings-logo">
          <h2>IntelliDesk</h2>
          <span>AI</span>
        </div>

        <nav>
          <Link to="/dashboard">▦ Dashboard</Link>

          <Link to="/tasks">✓ My Tasks</Link>

          <Link to="/ai-assistant">✦ AI Assistant</Link>

          <Link to="/analytics">↗ Analytics</Link>

          <Link to="/notifications">● Notifications</Link>

          <Link to="/settings" className="active">
            ⚙ Settings
          </Link>
        </nav>

        <div className="settings-user">
          <div className="settings-avatar">{userInitial}</div>

          <div>
            <strong>{userName}</strong>
            <p>Employee</p>
          </div>
        </div>
      </aside>

      <main className="settings-main">
        <header className="settings-header">
          <p className="page-label">PREFERENCES</p>

          <h1>Settings</h1>

          <p>Manage your IntelliDesk preferences.</p>
        </header>

        <section className="settings-card">
          <h2>Profile</h2>

          <div className="profile-section">
            <div className="large-avatar">{userInitial}</div>

            <div>
              <h3>{userName}</h3>

              <p>Employee</p>

              <p>{userEmail}</p>
            </div>
          </div>
        </section>

        <section className="settings-card">
          <h2>Preferences</h2>

          <div className="setting-row">
            <div>
              <h3>Notifications</h3>

              <p>Receive task and workspace notifications.</p>
            </div>

            <button
              type="button"
              className={`toggle ${notifications ? 'on' : ''}`}
              onClick={() => setNotifications(!notifications)}
            >
              <span></span>
            </button>
          </div>

          <div className="setting-row">
            <div>
              <h3>AI Suggestions</h3>

              <p>
                Allow IntelliDesk AI to provide task suggestions.
              </p>
            </div>

            <button
              type="button"
              className={`toggle ${aiSuggestions ? 'on' : ''}`}
              onClick={() => setAiSuggestions(!aiSuggestions)}
            >
              <span></span>
            </button>
          </div>
        </section>

        <section className="settings-card">
          <h2>Application</h2>

          <div className="setting-row">
            <div>
              <h3>AI Assistant</h3>

              <p>
                Use Gemma AI through your local Ollama setup.
              </p>
            </div>

            <span className="status-badge">Connected</span>
          </div>
        </section>

        <section className="settings-card">
          <h2>Account</h2>

          <div className="setting-row">
            <div>
              <h3>Logout</h3>

              <p>Sign out of your IntelliDesk account.</p>
            </div>

            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Settings