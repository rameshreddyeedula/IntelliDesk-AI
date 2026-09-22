import {Link} from 'react-router-dom'
import './index.css'

const Home = () => {
  return (
    <div className="home-page">
      {/* NAVBAR */}
      <header className="home-navbar">
        <div className="home-logo">
          IntelliDesk <span>AI</span>
        </div>

        <nav className="home-nav">
          <Link to="/login">Login</Link>
          <Link to="/register" className="nav-get-started">
            Get Started
          </Link>
        </nav>
      </header>

      {/* HERO SECTION */}
      <main>
        <section className="hero-section">
          <div className="hero-content">
            <p className="hero-label">AI-POWERED PRODUCTIVITY</p>

            <h1>
              Work Smarter.
              <br />
              Stay Organized.
            </h1>

            <p className="hero-description">
              Manage your tasks, understand your priorities, and improve your
              productivity with an intelligent AI-powered workspace.
            </p>

            <div className="hero-buttons">
              <Link to="/register" className="primary-link">
                Get Started
              </Link>

              <Link to="/login" className="secondary-link">
                Login
              </Link>
            </div>
          </div>

          {/* PRODUCTIVITY CARD */}
          <div className="productivity-card">
            <p className="productivity-title">Today's Productivity</p>

            <h2>82%</h2>

            <p className="on-track">On Track</p>

            <div className="productivity-stats">
              <span>
                Total Tasks
                <strong>24</strong>
              </span>

              <span>
                Completed
                <strong>15</strong>
              </span>

              <span>
                High Priority
                <strong>3</strong>
              </span>
            </div>

            <div className="mini-task">
              <strong>Prepare project report</strong>
              <span>High Priority • Today</span>
            </div>

            <div className="mini-task completed-task">
              <strong>✓ Review documentation</strong>
              <span>Medium Priority • Tomorrow</span>
            </div>

            <div className="mini-task">
              <strong>→ Team meeting preparation</strong>
              <span>Low Priority • Friday</span>
            </div>

            <div className="mini-circle">○</div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features-section">
          <div className="section-heading">
            <p>WHY INTELLIDESK AI?</p>
            <h2>Everything you need to stay productive</h2>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✓</div>

              <h3>Smart Task Management</h3>

              <p>
                Create, organize, prioritize, and track your tasks from one
                simple workspace.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">✦</div>

              <h3>AI Assistant</h3>

              <p>
                Let AI analyze your tasks and suggest priorities, categories,
                and useful next steps.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">↗</div>

              <h3>Productivity Analytics</h3>

              <p>
                Understand your progress through clear productivity statistics
                and visual insights.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="workflow-section">
          <div className="workflow-container">
            <div className="workflow-heading">
              <p>HOW IT WORKS</p>

              <h2>Simple workflow. Smarter productivity.</h2>
            </div>

            <div className="workflow-grid">
              <div className="workflow-card">
                <span className="workflow-number">01</span>

                <h3>Create Tasks</h3>

                <p>
                  Add your work, deadlines, categories, and priorities.
                </p>
              </div>

              <div className="workflow-card">
                <span className="workflow-number">02</span>

                <h3>Get AI Insights</h3>

                <p>
                  AI analyzes your tasks and recommends what to focus on.
                </p>
              </div>

              <div className="workflow-card">
                <span className="workflow-number">03</span>

                <h3>Track Progress</h3>

                <p>
                  Monitor completed work and productivity through analytics.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="home-footer">
        <div className="footer-content">
          <h2>IntelliDesk AI</h2>

          <p>AI-powered productivity for modern workspaces.</p>

          <span>© 2026 IntelliDesk AI. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}

export default Home