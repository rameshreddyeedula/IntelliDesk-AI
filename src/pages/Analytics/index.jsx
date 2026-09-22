import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import api from '../../services/api'
import './index.css'

const Analytics = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const [user] = useState(() => {
    const savedUser = localStorage.getItem('user')

    return savedUser ? JSON.parse(savedUser) : null
  })

  const userName = user?.name || 'Ramesh'
  const userInitial = userName.charAt(0).toUpperCase()

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

  const highPriorityTasks = tasks.filter(
    task => task.priority === 'High',
  ).length

  const mediumPriorityTasks = tasks.filter(
    task => task.priority === 'Medium',
  ).length

  const lowPriorityTasks = tasks.filter(
    task => task.priority === 'Low',
  ).length

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100)

  if (loading) {
    return (
      <div className="analytics-page">
        <h1>Loading Analytics...</h1>
      </div>
    )
  }

  return (
    <div className="analytics-page">
      <aside className="analytics-sidebar">
        <div className="analytics-logo">
          IntelliDesk <span>AI</span>
        </div>

        <nav>
          <Link to="/dashboard">
            ▦ Dashboard
          </Link>

          <Link to="/tasks">
            ✓ My Tasks
          </Link>

          <Link to="/ai-assistant">
            ✦ AI Assistant
          </Link>

          <Link to="/analytics" className="active">
            ↗ Analytics
          </Link>

          <Link to="/notifications">
            ● Notifications
          </Link>

          <Link to="/settings">
            ⚙ Settings
          </Link>
        </nav>

        <div className="analytics-user">
          <div className="analytics-avatar">
            {userInitial}
          </div>

          <div>
            <strong>{userName}</strong>
            <p>Employee</p>
          </div>
        </div>
      </aside>

      <main className="analytics-main">
        <header className="analytics-header">
          <p className="page-label">WORKSPACE</p>

          <h1>Analytics</h1>

          <p>
            Track your productivity and task performance.
          </p>
        </header>

        <section className="analytics-cards">
          <div className="analytics-card">
            <span>Total Tasks</span>
            <strong>{totalTasks}</strong>
          </div>

          <div className="analytics-card">
            <span>Completed</span>
            <strong>{completedTasks}</strong>
          </div>

          <div className="analytics-card">
            <span>In Progress</span>
            <strong>{inProgressTasks}</strong>
          </div>

          <div className="analytics-card">
            <span>Todo</span>
            <strong>{todoTasks}</strong>
          </div>
        </section>

        <section className="analytics-details">
          <div className="analytics-panel">
            <h2>Completion Rate</h2>

            <div className="progress-container">
              <div
                className="progress-bar"
                style={{width: `${completionRate}%`}}
              ></div>
            </div>

            <strong>{completionRate}%</strong>

            <p>
              {completedTasks} of {totalTasks} tasks completed.
            </p>
          </div>

          <div className="analytics-panel">
            <h2>Priority Overview</h2>

            <div className="priority-row">
              <span>High Priority</span>
              <strong>{highPriorityTasks}</strong>
            </div>

            <div className="priority-row">
              <span>Medium Priority</span>
              <strong>{mediumPriorityTasks}</strong>
            </div>

            <div className="priority-row">
              <span>Low Priority</span>
              <strong>{lowPriorityTasks}</strong>
            </div>
          </div>
        </section>

        <section className="analytics-panel">
          <h2>Task Status Overview</h2>

          <div className="priority-row">
            <span>Completed</span>
            <strong>{completedTasks}</strong>
          </div>

          <div className="priority-row">
            <span>In Progress</span>
            <strong>{inProgressTasks}</strong>
          </div>

          <div className="priority-row">
            <span>Todo</span>
            <strong>{todoTasks}</strong>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Analytics