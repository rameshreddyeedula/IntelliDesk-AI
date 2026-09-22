import {useState} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'task',
      title: 'New task assigned',
      message: 'You have a new task waiting to be started.',
      time: '10 minutes ago',
      read: false,
    },
    {
      id: 2,
      type: 'ai',
      title: 'AI analysis completed',
      message: 'Your task analysis is ready to review.',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      type: 'completed',
      title: 'Task completed',
      message: 'Your task was successfully completed.',
      time: 'Yesterday',
      read: true,
    },
  ])

  const [user] = useState(() => {
    const savedUser = localStorage.getItem('user')

    return savedUser ? JSON.parse(savedUser) : null
  })

  const userName = user?.name || 'Ramesh'
  const userInitial = userName.charAt(0).toUpperCase()

  const unreadCount = notifications.filter(
    notification => !notification.read,
  ).length

  const markAsRead = id => {
    setNotifications(
      notifications.map(notification =>
        notification.id === id
          ? {...notification, read: true}
          : notification,
      ),
    )
  }

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({
        ...notification,
        read: true,
      })),
    )
  }

  const deleteNotification = id => {
    setNotifications(
      notifications.filter(notification => notification.id !== id),
    )
  }

  return (
    <div className="notifications-page">
      <aside className="notifications-sidebar">
        <div className="notifications-logo">
          <h2>IntelliDesk</h2>
          <span>AI</span>
        </div>

        <nav>
          <Link to="/dashboard">
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

          <Link to="/notifications" className="active">
            <span>●</span>
            Notifications
          </Link>

          <Link to="/settings">
            <span>⚙</span>
            Settings
          </Link>
        </nav>

        <div className="notifications-user">
          <div className="notifications-avatar">
            {userInitial}
          </div>

          <div>
            <strong>{userName}</strong>
            <p>Employee</p>
          </div>
        </div>
      </aside>

      <main className="notifications-main">
        <header className="notifications-header">
          <div>
            <p className="page-label">WORKSPACE UPDATES</p>

            <h1>Notifications</h1>

            <p>Stay updated with your tasks and workspace activity.</p>
          </div>

          {unreadCount > 0 && (
            <button
              type="button"
              className="mark-all-button"
              onClick={markAllAsRead}
            >
              Mark all as read
            </button>
          )}
        </header>

        <section className="notification-summary">
          <div>
            <strong>{notifications.length}</strong>
            <span>Total notifications</span>
          </div>

          <div>
            <strong>{unreadCount}</strong>
            <span>Unread notifications</span>
          </div>
        </section>

        <section className="notification-list">
          {notifications.length === 0 ? (
            <div className="empty-notifications">
              <div className="empty-icon">✓</div>

              <h2>You're all caught up</h2>

              <p>No new notifications at the moment.</p>
            </div>
          ) : (
            notifications.map(notification => (
              <div
                className={`notification-card ${
                  notification.read ? 'read' : 'unread'
                }`}
                key={notification.id}
              >
                <div className={`notification-icon ${notification.type}`}>
                  {notification.type === 'task' && '✓'}

                  {notification.type === 'ai' && '✦'}

                  {notification.type === 'completed' && '✓'}
                </div>

                <div className="notification-content">
                  <div className="notification-title-row">
                    <h3>{notification.title}</h3>

                    {!notification.read && (
                      <span className="unread-dot"></span>
                    )}
                  </div>

                  <p>{notification.message}</p>

                  <span className="notification-time">
                    {notification.time}
                  </span>
                </div>

                <div className="notification-actions">
                  {!notification.read && (
                    <button
                      type="button"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark read
                    </button>
                  )}

                  <button
                    type="button"
                    className="delete-notification"
                    onClick={() =>
                      deleteNotification(notification.id)
                    }
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  )
}

export default Notifications