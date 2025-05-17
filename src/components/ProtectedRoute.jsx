import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, isAuthenticated } = useAuth()
    
    // Añadimos logs para debuggear
    console.log('ProtectedRoute:', {
        isAuthenticated,
        userRole: user?.role,
        allowedRoles
    })

    if (!isAuthenticated) {
        console.log('Usuario no autenticado, redirigiendo a /login')
        return <Navigate to="/login" />
    }
    
    if (!allowedRoles.includes(user?.role)) {
        console.log('Rol no permitido, redirigiendo a /')
        return <Navigate to="/" />
    }

    return children
}