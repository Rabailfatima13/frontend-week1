import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { createTask, deleteTask, listTasks, updateTask } from '../api/tasks'

const initialForm = { title: '', description: '' }

function Tasks() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let cancelled = false

    listTasks()
      .then((data) => {
        if (!cancelled) setTasks(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!form.title.trim()) return

    setSubmitting(true)
    setError('')
    try {
      const task = await createTask({
        title: form.title.trim(),
        description: form.description.trim() || null,
      })
      setTasks((current) => [...current, task])
      setForm(initialForm)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const toggleCompleted = async (task) => {
    setError('')
    try {
      const updated = await updateTask(task.id, { completed: !task.completed })
      setTasks((current) =>
        current.map((item) => (item.id === updated.id ? updated : item)),
      )
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (taskId) => {
    setError('')
    try {
      await deleteTask(taskId)
      setTasks((current) => current.filter((item) => item.id !== taskId))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="page-card">
      <h1>My Tasks</h1>
      {user ? (
        <p className="tasks-subtitle">Signed in as {user.email}</p>
      ) : null}

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <label className="form-field" htmlFor="title">
          <span>Title</span>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="What needs to be done?"
          />
        </label>

        <label className="form-field" htmlFor="description">
          <span>Description</span>
          <textarea
            id="description"
            name="description"
            rows="2"
            value={form.description}
            onChange={handleChange}
            placeholder="Optional details"
          />
        </label>

        <button type="submit" className="submit-button" disabled={submitting}>
          {submitting ? 'Adding…' : 'Add Task'}
        </button>
      </form>

      {error ? <small className="form-error">{error}</small> : null}

      {loading ? (
        <p>Loading tasks…</p>
      ) : tasks.length === 0 ? (
        <p>No tasks yet — add one above.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={task.completed ? 'task-item done' : 'task-item'}
            >
              <label className="task-checkbox">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompleted(task)}
                />
                <div>
                  <p className="task-title">{task.title}</p>
                  {task.description ? (
                    <p className="task-description">{task.description}</p>
                  ) : null}
                </div>
              </label>
              <button
                type="button"
                className="task-delete"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Tasks
