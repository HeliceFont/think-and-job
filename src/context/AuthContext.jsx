import { createContext, useContext, useState, useEffect } from 'react'
import fakeAuthService from '@/services/fakeAuthService'

const AuthContext = createContext()

function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider')
    }
    return context
}

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true) // Añadimos estado de carga

    useEffect(() => {
        const initAuth = () => {
            const token = localStorage.getItem('token')
            const savedUser = localStorage.getItem('user')
            
            if (token && savedUser) {
                try {
                    const parsedUser = JSON.parse(savedUser)
                    setUser(parsedUser)
                    setIsAuthenticated(true)
                } catch (error) {
                    console.error('Error al parsear usuario:', error)
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                }
            }
            setIsLoading(false)
        }

        initAuth()
    }, [])

    const login = async (credentials) => {
        try {
            const response = await fakeAuthService(credentials)
            
            if (response.user && response.token) {
                setUser(response.user)
                setIsAuthenticated(true)
                localStorage.setItem('token', response.token)
                localStorage.setItem('user', JSON.stringify(response.user))
            }
            
            return response
        } catch (error) {
            console.error('Error en login:', error)
            throw error
        }
    }

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    if (isLoading) {
        return <div>Cargando...</div> // O tu componente de loading
    }

    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated, 
            login, 
            logout,
            isLoading 
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, useAuth }
