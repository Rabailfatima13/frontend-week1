// Base URL of the FastAPI backend. Override with VITE_API_URL in a .env file.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const TOKEN_KEY = 'tm_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * Thin fetch wrapper.
 * - `body`  → sent as JSON.
 * - `form`  → sent as x-www-form-urlencoded (used by the OAuth2 login endpoint).
 * - `auth`  → attaches the stored Bearer token (default true).
 * Throws an Error (with `.status`) carrying the API's `detail` message.
 */
export async function request(
  path,
  { method = 'GET', body, form, auth = true, headers = {} } = {},
) {
  const finalHeaders = { ...headers }
  let payload

  if (form) {
    payload = new URLSearchParams(form)
    finalHeaders['Content-Type'] = 'application/x-www-form-urlencoded'
  } else if (body !== undefined) {
    payload = JSON.stringify(body)
    finalHeaders['Content-Type'] = 'application/json'
  }

  if (auth) {
    const token = getToken()
    if (token) finalHeaders['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: finalHeaders,
    body: payload,
  })

  if (response.status === 204) return null

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const detail = data?.detail
    const message =
      typeof detail === 'string'
        ? detail
        : `Request failed (${response.status})`
    const error = new Error(message)
    error.status = response.status
    throw error
  }

  return data
}

export { API_URL }
