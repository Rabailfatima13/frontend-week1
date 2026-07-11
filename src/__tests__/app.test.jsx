import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App'

describe('Week 1 SPA', () => {
  it('renders the navbar correctly', () => {
    render(<App />)

    expect(
      screen.getByRole('navigation', { name: /primary navigation/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('renders the home page content', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: /welcome to my react spa/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/this simple single-page application/i),
    ).toBeInTheDocument()
  })

  it('validates the contact form', async () => {
    const user = userEvent.setup()
    window.history.pushState({}, '', '/contact')
    render(<App />)

    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(screen.getByText(/name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/message is required/i)).toBeInTheDocument()

    await user.type(screen.getByLabelText(/name/i), 'Ada Lovelace')
    await user.type(screen.getByLabelText(/email/i), 'ada@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Hello from testing!')
    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(
      screen.getByText(/thank you! your message has been received/i),
    ).toBeInTheDocument()
  })
})
