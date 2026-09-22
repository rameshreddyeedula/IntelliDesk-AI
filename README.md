# IntelliDesk AI

IntelliDesk AI is a full-stack task management application with an AI assistant.

It helps users create and manage tasks and also analyze a task using AI to get priority, estimated time, complexity, recommended steps, and basic advice.

## Features

- User registration and login
- Create, update and delete tasks
- Set task priority and status
- Set due dates
- AI-based task analysis
- Recommended steps for tasks
- AI-generated task advice
- Dashboard with task information
- Analytics
- Notifications
- Settings

## How AI is Used

A user can enter a task such as:

> Fix the production login issue before tomorrow's client demo.

The application sends the task to the backend, where the AI service analyzes it and returns:

- Priority
- Estimated time
- Complexity
- Recommended steps
- Advice

The user can then use the result while planning the task.

## Tech Stack

### Frontend
- React.js
- JavaScript
- HTML
- CSS
- Vite

### Backend
- Python
- FastAPI
- REST API

### Database
- SQLite
- SQL

### AI
- Ollama
- Gemma

## Project Structure

```text
IntelliDesk-AI
│
├── backend
│   ├── models
│   ├── routes
│   ├── schemas
│   ├── services
│   ├── database.py
│   └── main.py
│
├── src
│   ├── components
│   ├── pages
│   ├── services
│   ├── App.jsx
│   └── main.jsx
│
├── public
├── package.json
├── vite.config.js
└── README.md
