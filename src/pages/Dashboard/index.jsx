import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import StatCard from '../../components/StatCard'
import api from '../../services/api'
import './index.css'

const Dashboard = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const [user] = useState(() => {
    const savedUser = localStorage.getItem('user')

    return savedUser ? JSON.parse(savedUser) : null
  })

  const userName = user?.name || 'Ramesh'
  const userInitial = userName.charAt(0).toUpperCase()

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await api.get('/tasks/')
        setTasks(response.data)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      } finally {
        setLoading(false)
      }
    }

    getTasks()
  }, [])

  const totalTasks = tasks.length

  const completedTasks = tasks.filter(
    task => task.status === 'Completed',
  ).length

  const inProgressTasks = tasks.filter(
    task => task.status === 'In Progress',
  ).length

  const todoTasks = tasks.filter(
    task => task.status === 'Todo',
  ).length

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100)

  const focusTasks = tasks
    .filter(task => task.status !== 'Completed')
    .slice(0, 3)

  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>IntelliDesk</h2>
          <span>AI</span>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className="active">
            <span>▦</span>
            Dashboard
          </Link>

          <Link to="/tasks">
            <span>✓</span>
            My Tasks
          </Link>

          <Link to="/ai-assistant">
            <span>✦</span>
            AI Assistant
          </Link>

          <Link to="/analytics">
            <span>↗</span>
            Analytics
          </Link>

          <Link to="/notifications">
            <span>●</span>
            Notifications
          </Link>

          <Link to="/settings">
            <span>⚙</span>
            Settings
          </Link>
        </nav>

        <div className="sidebar-bottom">
          <div className="user-mini">
            <div className="avatar">{userInitial}</div>

            <div>
              <strong>{userName}</strong>
              <p>Employee</p>
            </div>
          </div>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            ↪ Logout
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="welcome-text">Welcome back 👋</p>

            <h1>Your Productivity Dashboard</h1>
          </div>

          <div className="header-actions">
            <button type="button" className="icon-button">
              ⌕
            </button>

            <button type="button" className="icon-button">
              🔔
            </button>

            <div className="profile-circle">{userInitial}</div>
          </div>
        </header>

        <section className="stats-grid">
          <StatCard
            title="Total Tasks"
            value={loading ? '...' : totalTasks}
            description="All your tasks"
          />

          <StatCard
            title="Completed"
            value={loading ? '...' : completedTasks}
            description="Tasks completed"
          />

          <StatCard
            title="In Progress"
            value={loading ? '...' : inProgressTasks}
            description="Currently working"
          />

          <StatCard
            title="Todo"
            value={loading ? '...' : todoTasks}
            description="Tasks waiting"
          />
        </section>

        <section className="dashboard-grid">
          <div className="dashboard-card focus-card">
            <div className="card-header">
              <div>
                <p className="card-label">TODAY'S FOCUS</p>

                <h2>Important tasks</h2>
              </div>

              <Link to="/tasks">View all</Link>
            </div>

            {focusTasks.length === 0 ? (
              <div className="focus-task">
                <div className="task-info">
                  <h3>No pending tasks</h3>

                  <p>You're all caught up!</p>
                </div>
              </div>
            ) : (
              focusTasks.map(task => (
                <div className="focus-task" key={task.id}>
                  <div className="task-check">○</div>

                  <div className="task-info">
                    <h3>{task.title}</h3>

                    <p>
                      {task.priority} Priority • Due{' '}
                      {task.due_date || 'No deadline'}
                    </p>
                  </div>

                  <span
                    className={`priority ${task.priority.toLowerCase()}`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="dashboard-card productivity-card">
            <p className="card-label">PRODUCTIVITY</p>

            <h2>{loading ? '...' : `${completionRate}%`}</h2>

            <p className="productivity-text">
              {completionRate >= 70
                ? "You're making good progress!"
                : 'Keep working on your tasks.'}
            </p>

            <div className="progress-bar">
              <div
                className="progress-value"
                style={{width: `${completionRate}%`}}
              ></div>
            </div>

            <div className="productivity-details">
              <span>Task completion</span>

              <strong>
                {completedTasks} / {totalTasks}
              </strong>
            </div>
          </div>
        </section>

        <section className="dashboard-card recent-card">
          <div className="card-header">
            <div>
              <p className="card-label">TASK SUMMARY</p>

              <h2>Your current workload</h2>
            </div>
          </div>

          <div className="activity-list">
            <div className="activity">
              <span className="activity-icon completed">✓</span>

              <div>
                <strong>{completedTasks} completed tasks</strong>

                <p>Tasks successfully finished</p>
              </div>
            </div>

            <div className="activity">
              <span className="activity-icon ai">✦</span>

              <div>
                <strong>{inProgressTasks} tasks in progress</strong>

                <p>Currently being worked on</p>
              </div>
            </div>

            <div className="activity">
              <span className="activity-icon task">+</span>

              <div>
                <strong>{todoTasks} pending tasks</strong>

                <p>Waiting to be started</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard