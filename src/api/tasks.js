import { request } from './client'

export const listTasks = () => request('/tasks')

export const createTask = (task) =>
  request('/tasks', { method: 'POST', body: task })

export const updateTask = (id, updates) =>
  request(`/tasks/${id}`, { method: 'PATCH', body: updates })

export const deleteTask = (id) =>
  request(`/tasks/${id}`, { method: 'DELETE' })
