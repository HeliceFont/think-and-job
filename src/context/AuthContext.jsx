import { createContext, useContext, useState, useEffect } from 'react'
import { fakeAuthService } from '../services/fakeAuthService'

const AuthContext = createContext()

// Separamos el hook useAuth a una función nombrada
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

    useEffect(() => {
        const token = localStorage.getItem('token')
        const savedUser = localStorage.getItem('user')
        
        if (token && savedUser) {
            setUser(JSON.parse(savedUser))
            setIsAuthenticated(true)
        }
    }, [])

    const login = async (credentials) => {
        try {
            const response = await fakeAuthService(credentials)
            console.log('Respuesta del servicio:', response)

            setUser(response.user)
            setIsAuthenticated(true)
            localStorage.setItem('token', response.token)
            localStorage.setItem('user', JSON.stringify(response.user))
            
            return response // Importante: devolver la respuesta
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

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// Exportamos las funciones como named exports
export { AuthProvider, useAuth }
