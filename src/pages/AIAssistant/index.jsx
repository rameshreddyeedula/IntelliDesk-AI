import {useState} from 'react'
import {Link} from 'react-router-dom'
import api from '../../services/api'
import './index.css'

const AIAssistant = () => {
  const [task, setTask] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const analyzeTask = async event => {
    event.preventDefault()

    if (!task.trim()) {
      setError('Please describe your task first.')
      return
    }

    setLoading(true)
    setError('')
    setAnalysis(null)

    try {
      const response = await api.post('/ai/analyze', {
        task: task.trim(),
      })

      console.log('AI Response:', response.data)

      setAnalysis(response.data)
    } catch (error) {
      console.error('AI Analysis Error:', error)

      setError('Unable to analyze the task. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ai-page">
      <aside className="ai-sidebar">
        <div className="ai-logo">
          IntelliDesk <span>AI</span>
        </div>

        <nav>
          <Link to="/dashboard">▦ Dashboard</Link>

          <Link to="/tasks">✓ My Tasks</Link>

          <Link to="/ai-assistant" className="active">
            ✦ AI Assistant
          </Link>

          <Link to="/analytics">↗ Analytics</Link>

          <Link to="/notifications">● Notifications</Link>

          <Link to="/settings">⚙ Settings</Link>
        </nav>

        <div className="ai-user">
          <div className="ai-avatar">R</div>

          <div>
            <strong>Ramesh</strong>
            <p>Employee</p>
          </div>
        </div>
      </aside>

      <main className="ai-main">
        <header className="ai-header">
          <p className="page-label">INTELLIGENT WORKSPACE</p>

          <h1>AI Assistant</h1>

          <p>
            Describe your task and let AI help you understand and plan it.
          </p>
        </header>

        <section className="ai-input-card">
          <div className="ai-card-title">
            <div className="ai-icon">✦</div>

            <div>
              <h2>Analyze a Task</h2>

              <p>
                Get AI-powered priority, complexity, time and action steps.
              </p>
            </div>
          </div>

          <form onSubmit={analyzeTask}>
            <textarea
              value={task}
              onChange={event => setTask(event.target.value)}
              placeholder="Example: Complete my final year project report"
            />

            {error && <p className="ai-error">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? '✦ Analyzing...' : '✦ Analyze Task'}
            </button>
          </form>
        </section>

        {analysis && (
          <section className="analysis-section">
            <div className="analysis-header">
              <p className="page-label">AI RESULT</p>

              <h2>Task Analysis</h2>
            </div>

            <div className="analysis-stats">
              <div className="analysis-card">
                <span>Priority</span>

                <strong>{analysis.priority}</strong>
              </div>

              <div className="analysis-card">
                <span>Estimated Time</span>

                <strong>{analysis.estimatedTime}</strong>
              </div>

              <div className="analysis-card">
                <span>Complexity</span>

                <strong>{analysis.complexity}</strong>
              </div>
            </div>

            <div className="analysis-details">
              <div className="steps-card">
                <h3>Recommended Steps</h3>

                <ol>
                  {analysis.steps?.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="advice-card">
                <h3>AI Advice</h3>

                <p>{analysis.advice}</p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default AIAssistant