import { createContext, useContext, useState, useEffect } from 'react'
import { login as authLogin } from '../services/fakeAuthService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Intentar recuperar el usuario del localStorage al inicio
        const savedUser = localStorage.getItem('user')
        return savedUser ? JSON.parse(savedUser) : null
    })

    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || null
    })

    useEffect(() => {
        // Guardar el usuario en localStorage cuando cambie
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.removeItem('user')
        }
    }, [user])

    useEffect(() => {
        // Guardar el token en localStorage cuando cambie
        if (token) {
            localStorage.setItem('token', token)
        } else {
            localStorage.removeItem('token')
        }
    }, [token])

    const login = async (credentials) => {
        const response = await authLogin(credentials)
        setUser(response.user)
        setToken(response.token)
        return response
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user && !!token
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider')
    }
    return context
}
