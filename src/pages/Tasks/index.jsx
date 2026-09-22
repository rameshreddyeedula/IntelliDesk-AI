import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import api from '../../services/api'
import './index.css'

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const [aiLoading, setAiLoading] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState(null)
  const [aiError, setAiError] = useState('')

  const [user] = useState(() => {
    const savedUser = localStorage.getItem('user')

    return savedUser ? JSON.parse(savedUser) : null
  })

  const userName = user?.name || 'Ramesh'
  const userInitial = userName.charAt(0).toUpperCase()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Todo',
    due_date: '',
  })

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

  useEffect(() => {
    getTasks()
  }, [])

  const openCreateModal = () => {
    setEditingTask(null)

    setFormData({
      title: '',
      description: '',
      priority: 'Medium',
      status: 'Todo',
      due_date: '',
    })

    setAiAnalysis(null)
    setAiError('')
    setShowModal(true)
  }

  const openEditModal = task => {
    setEditingTask(task)

    setFormData({
      title: task.title || '',
      description: task.description || '',
      priority: task.priority || 'Medium',
      status: task.status || 'Todo',
      due_date: task.due_date || '',
    })

    setAiAnalysis(null)
    setAiError('')
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingTask(null)
    setAiAnalysis(null)
    setAiError('')
  }

  const handleChange = event => {
    const {name, value} = event.target

    setFormData(previousData => ({
      ...previousData,
      [name]: value,
    }))
  }

  const analyzeWithAI = async () => {
    if (!formData.title.trim() && !formData.description.trim()) {
      setAiError('Please enter a task title or description first.')
      return
    }

    setAiLoading(true)
    setAiError('')
    setAiAnalysis(null)

    try {
      const taskText = formData.description.trim()
        ? `${formData.title.trim()}: ${formData.description.trim()}`
        : formData.title.trim()

      const response = await api.post('/ai/analyze', {
        task: taskText,
      })

      setAiAnalysis(response.data)

      if (response.data?.priority) {
        setFormData(previousData => ({
          ...previousData,
          priority: response.data.priority,
        }))
      }
    } catch (error) {
      console.error('AI Analysis Error:', error)
      setAiError('Unable to analyze the task. Please try again.')
    } finally {
      setAiLoading(false)
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()

    if (!formData.title.trim()) {
      alert('Please enter a task title.')
      return
    }

    try {
      if (editingTask) {
        const response = await api.put(
          `/tasks/${editingTask.id}`,
          formData,
        )

        setTasks(previousTasks =>
          previousTasks.map(task =>
            task.id === editingTask.id ? response.data : task,
          ),
        )
      } else {
        const response = await api.post('/tasks/', formData)

        setTasks(previousTasks => [
          ...previousTasks,
          response.data,
        ])
      }

      closeModal()
    } catch (error) {
      console.error('Error saving task:', error)
      alert('Unable to save task. Please try again.')
    }
  }

  const handleDelete = async taskId => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this task?',
    )

    if (!confirmed) {
      return
    }

    try {
      await api.delete(`/tasks/${taskId}`)

      setTasks(previousTasks =>
        previousTasks.filter(task => task.id !== taskId),
      )
    } catch (error) {
      console.error('Error deleting task:', error)
      alert('Unable to delete task.')
    }
  }

  const handleComplete = async task => {
    const newStatus =
      task.status === 'Completed' ? 'Todo' : 'Completed'

    const updatedTask = {
      title: task.title,
      description: task.description || '',
      priority: task.priority || 'Medium',
      status: newStatus,
      due_date: task.due_date || '',
    }

    try {
      const response = await api.put(
        `/tasks/${task.id}`,
        updatedTask,
      )

      setTasks(previousTasks =>
        previousTasks.map(item =>
          item.id === task.id ? response.data : item,
        ),
      )
    } catch (error) {
      console.error('Error updating task status:', error)
      alert('Unable to update task status.')
    }
  }

  const filteredTasks = tasks.filter(task => {
    const searchText = search.toLowerCase()

    const matchesSearch =
      task.title?.toLowerCase().includes(searchText) ||
      task.description?.toLowerCase().includes(searchText)

    const matchesStatus =
      statusFilter === 'All' || task.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="tasks-page">
      <aside className="tasks-sidebar">
        <div className="tasks-logo">
          IntelliDesk <span>AI</span>
        </div>

        <nav>
          <Link to="/dashboard">▦ Dashboard</Link>

          <Link to="/tasks" className="active">
            ✓ My Tasks
          </Link>

          <Link to="/ai-assistant">✦ AI Assistant</Link>

          <Link to="/analytics">↗ Analytics</Link>

          <Link to="/notifications">● Notifications</Link>

          <Link to="/settings">⚙ Settings</Link>
        </nav>

        <div className="tasks-user">
          <div className="tasks-avatar">{userInitial}</div>

          <div>
            <strong>{userName}</strong>
            <p>Employee</p>
          </div>
        </div>
      </aside>

      <main className="tasks-main">
        <header className="tasks-header">
          <div>
            <p className="page-label">WORKSPACE</p>

            <h1>My Tasks</h1>

            <p>Manage your tasks and stay productive.</p>
          </div>

          <button
            type="button"
            className="add-task-button"
            onClick={openCreateModal}
          >
            + Add Task
          </button>
        </header>

        <div className="task-controls">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={event => setSearch(event.target.value)}
          />

          <select
            value={statusFilter}
            onChange={event => setStatusFilter(event.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {loading ? (
          <div className="empty-task">
            <div>⏳</div>

            <h2>Loading tasks...</h2>

            <p>Please wait while your tasks are loaded.</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="empty-task">
            <div>✓</div>

            <h2>No tasks found</h2>

            <p>
              {tasks.length === 0
                ? 'Create your first task to get started.'
                : 'Try changing your search or filter.'}
            </p>
          </div>
        ) : (
          <div className="task-list">
            {filteredTasks.map(task => (
              <div className="task-card" key={task.id}>
                <div className="task-card-top">
                  <button
                    type="button"
                    className={`task-check ${
                      task.status === 'Completed' ? 'completed' : ''
                    }`}
                    onClick={() => handleComplete(task)}
                    aria-label={
                      task.status === 'Completed'
                        ? 'Mark task as incomplete'
                        : 'Mark task as complete'
                    }
                  >
                    {task.status === 'Completed' ? '✓' : ''}
                  </button>

                  <div className="task-content">
                    <h2
                      className={
                        task.status === 'Completed'
                          ? 'task-completed'
                          : ''
                      }
                    >
                      {task.title}
                    </h2>

                    {task.description && (
                      <p>{task.description}</p>
                    )}

                    <div className="task-meta">
                      <span>{task.status}</span>

                      {task.due_date && (
                        <span>Due {task.due_date}</span>
                      )}
                    </div>
                  </div>

                  <span
                    className={`task-priority ${
                      task.priority?.toLowerCase() || 'medium'
                    }`}
                  >
                    {task.priority || 'Medium'}
                  </span>

                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => openEditModal(task)}
                    aria-label="Edit task"
                  >
                    ✎
                  </button>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleDelete(task.id)}
                    aria-label="Delete task"
                  >
                    ×
                  </button>
                </div>

                <div className="task-status">
                  Status: {task.status}
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="modal-overlay">
            <div className="task-modal">
              <div className="modal-header">
                <h2>
                  {editingTask ? 'Edit Task' : 'Create Task'}
                </h2>

                <button
                  type="button"
                  className="close-button"
                  onClick={closeModal}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <label htmlFor="title">Task Title</label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter task title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="description">
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe your task..."
                  value={formData.description}
                  onChange={handleChange}
                />

                {!editingTask && (
                  <div className="ai-analyze-box">
                    <button
                      type="button"
                      className="ai-analyze-button"
                      onClick={analyzeWithAI}
                      disabled={aiLoading}
                    >
                      {aiLoading
                        ? '✦ Analyzing...'
                        : '✦ Analyze with AI'}
                    </button>

                    {aiError && (
                      <p className="ai-task-error">{aiError}</p>
                    )}

                    {aiAnalysis && (
                      <div className="ai-task-result">
                        <div className="ai-result-header">
                          <span>✦</span>
                          <strong>AI Task Analysis</strong>
                        </div>

                        <div className="ai-result-stats">
                          <div>
                            <small>Priority</small>
                            <strong>
                              {aiAnalysis.priority || 'Medium'}
                            </strong>
                          </div>

                          <div>
                            <small>Time</small>
                            <strong>
                              {aiAnalysis.estimatedTime ||
                                'Not specified'}
                            </strong>
                          </div>

                          <div>
                            <small>Complexity</small>
                            <strong>
                              {aiAnalysis.complexity ||
                                'Medium'}
                            </strong>
                          </div>
                        </div>

                        {aiAnalysis.steps?.length > 0 && (
                          <div className="ai-steps">
                            <h4>Recommended Steps</h4>

                            <ol>
                              {aiAnalysis.steps.map(
                                (step, index) => (
                                  <li key={index}>{step}</li>
                                ),
                              )}
                            </ol>
                          </div>
                        )}

                        {aiAnalysis.advice && (
                          <div className="ai-advice">
                            <strong>AI Advice</strong>
                            <p>{aiAnalysis.advice}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div className="form-row">
                  <div>
                    <label htmlFor="priority">
                      Priority
                    </label>

                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="status">Status</label>

                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Todo">Todo</option>
                      <option value="In Progress">
                        In Progress
                      </option>
                      <option value="Completed">
                        Completed
                      </option>
                    </select>
                  </div>
                </div>

                <label htmlFor="due_date">Due Date</label>

                <input
                  id="due_date"
                  name="due_date"
                  type="date"
                  value={formData.due_date}
                  onChange={handleChange}
                />

                <button
                  type="submit"
                  className="create-task-button"
                >
                  {editingTask
                    ? 'Update Task'
                    : 'Create Task'}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Tasks