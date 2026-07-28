import { request } from './client'

// The backend's /auth/login expects OAuth2 form fields: username + password.
export function loginRequest(email, password) {
  return request('/auth/login', {
    method: 'POST',
    form: { username: email, password },
    auth: false,
  })
}

export function registerRequest(email, password) {
  return request('/users/', {
    method: 'POST',
    body: { email, password },
    auth: false,
  })
}

export function getMe() {
  return request('/users/me')
}
