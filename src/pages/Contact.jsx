import { useState } from 'react'

const initialValues = {
  name: '',
  email: '',
  message: '',
}

const initialErrors = {
  name: '',
  email: '',
  message: '',
}

function Contact() {
  const [formData, setFormData] = useState(initialValues)
  const [errors, setErrors] = useState(initialErrors)
  const [submitted, setSubmitted] = useState(false)

  const validateForm = (values) => {
    const nextErrors = { ...initialErrors }

    if (!values.name.trim()) {
      nextErrors.name = 'Name is required.'
    }

    if (!values.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!values.message.trim()) {
      nextErrors.message = 'Message is required.'
    }

    return nextErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentValues) => ({ ...currentValues, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
    setSubmitted(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validateForm(formData)
    setErrors(nextErrors)

    if (Object.values(nextErrors).some(Boolean)) {
      setSubmitted(false)
      return
    }

    setSubmitted(true)
    setFormData(initialValues)
  }

  return (
    <section className="page-card">
      <h1>Contact Us</h1>
      <p>Use the form below to send a message.</p>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <label className="form-field" htmlFor="name">
          <span>Name</span>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
          />
          {errors.name ? (
            <small className="form-error">{errors.name}</small>
          ) : null}
        </label>

        <label className="form-field" htmlFor="email">
          <span>Email</span>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          {errors.email ? (
            <small className="form-error">{errors.email}</small>
          ) : null}
        </label>

        <label className="form-field" htmlFor="message">
          <span>Message</span>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here"
          />
          {errors.message ? (
            <small className="form-error">{errors.message}</small>
          ) : null}
        </label>

        <button type="submit" className="submit-button">
          Send Message
        </button>
      </form>

      {submitted ? (
        <p className="form-success">
          Thank you! Your message has been received.
        </p>
      ) : null}
    </section>
  )
}

export default Contact
