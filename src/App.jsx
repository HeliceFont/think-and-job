import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'


import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import ManagerDashboard from './pages/ManagerDashboard'
import EmployeeDashboard from './pages/EmployeeDashboard'

import ExampleDashboard from './components/ExampleDashboard'
import { Footer } from './components/Footer'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth()
  
  // Añadimos logs para debuggear
  console.log('ProtectedRoute Estado:', {
    isAuthenticated,
    user,
    allowedRoles
  })

  // Primer check: Si no está autenticado, redirige al login
  if (!isAuthenticated) {
    console.log('Usuario no autenticado, redirigiendo a login')
    return <Navigate to="/login" />
  }

  // Segundo check: Si no hay usuario o no tiene rol, redirige a la página principal
  if (!user || !user.role) {
    console.log('Usuario o rol no definido, redirigiendo a home')
    return <Navigate to="/" />
  }

  // Tercer check: Si el rol no está permitido, redirige a la página principal
  if (!allowedRoles.includes(user.role)) {
    console.log(`Rol ${user.role} no permitido para esta ruta`)
    return <Navigate to="/" />
  }

  // Si pasa todas las validaciones, renderiza los children
  console.log('Acceso permitido para:', user.role)
  return children
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manager"
                element={
                  <ProtectedRoute allowedRoles={['manager']}>
                    <ManagerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employee"
                element={
                  <ProtectedRoute allowedRoles={['employee']}>
                    <EmployeeDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
