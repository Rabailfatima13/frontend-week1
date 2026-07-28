import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const initialValues = { email: '', password: '' }

function Login() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [values, setValues] = useState(initialValues)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (isAuthenticated) {
    return <Navigate to={location.state?.from ?? '/tasks'} replace />
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await login(values.email, values.password)
      navigate(location.state?.from ?? '/tasks', { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="page-card">
      <h1>Log In</h1>
      <p>Sign in with your Task Manager account.</p>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <label className="form-field" htmlFor="email">
          <span>Email</span>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="username"
          />
        </label>

        <label className="form-field" htmlFor="password">
          <span>Password</span>
          <input
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </label>

        {error ? <small className="form-error">{error}</small> : null}

        <button type="submit" className="submit-button" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Log In'}
        </button>
      </form>
    </section>
  )
}

export default Login
