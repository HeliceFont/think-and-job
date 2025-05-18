import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, isAuthenticated, isLoading } = useAuth()
    const location = useLocation()
    
    if (isLoading) {
        return <div>Cargando...</div> // O tu componente de loading
    }

    if (!isAuthenticated || !user) {
        console.log('Usuario no autenticado, redirigiendo a /login')
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    
    if (!allowedRoles.includes(user.role)) {
        console.log('Rol no permitido, redirigiendo a /')
        return <Navigate to="/" replace />
    }

    return children
}