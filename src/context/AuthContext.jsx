import { createContext, useContext, useEffect, useState } from 'react'
import { clearToken, getToken, setToken } from '../api/client'
import { getMe, loginRequest } from '../api/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // On first load, restore the session from a stored token (if any).
  useEffect(() => {
    if (!getToken()) {
      setLoading(false)
      return
    }
    getMe()
      .then(setUser)
      .catch(() => clearToken())
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const { access_token } = await loginRequest(email, password)
    setToken(access_token)
    const me = await getMe()
    setUser(me)
    return me
  }

  const logout = () => {
    clearToken()
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: Boolean(user),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
