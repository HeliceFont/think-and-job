import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { WorkTimeProvider } from './context/WorkTimeContext'
import { SocketProvider } from './context/SocketContext'


import LandingPage from '@/pages/LandingPage'
import Login from '@/pages/Login'
import AdminDashboard from '@/pages/AdminDashboard'
import ManagerDashboard from '@/pages/EncargadoDashboard'
import ColaboradorDashboard from '@/pages/ColaboradorDashboard'

import CandidatoDashboard from '@/pages/CandidatoDashboard'
import { Footer } from '@/components/Footer'
import EncargadoDashboard from '@/pages/EncargadoDashboard'
import SuperMasterDashboard from '@/pages/SuperMasterDashboard'
import { ColaboradorDashboard as ColaboradorDashboardComponent } from './components/colaborador/ColaboradorDashboard'
import { FormacionSection } from './components/colaborador/FormacionSection'
import { PRLSection } from './components/colaborador/PRLSection'
import { DocumentacionSection } from './components/colaborador/DocumentacionSection'
import { IncidenciasSection } from './components/colaborador/IncidenciasSection'
import { HorariosSection } from './components/colaborador/HorariosSection'
import { PerfilSection } from './components/colaborador/PerfilSection'
import DashboardColaborador from './components/colaborador/DashboardColaborador'
import Register from '@/pages/Register'
import RecuperarPassword from '@/pages/RecuperarPassword'

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
      <SocketProvider>
        <WorkTimeProvider>
          <BrowserRouter basename="/">
            <div className="min-h-screen flex flex-col">
              <div className="flex-grow">
                <Routes>
                  {/* Rutas públicas que no necesitan WorkTimeProvider */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/recuperar-password" element={<RecuperarPassword />} />
                  
                  {/* Rutas que necesitan WorkTimeProvider */}
                  <Route
                    path="/colaborador/*"
                    element={
                      <ProtectedRoute allowedRoles={['colaborador']}>
                        <WorkTimeProvider>
                          <Routes>
                            <Route path="/" element={<DashboardColaborador />} />
                            <Route path="perfil" element={<PerfilSection />} />
                            <Route path="formacion" element={<FormacionSection />} />
                            <Route path="prl" element={<PRLSection />} />
                            <Route path="documentacion" element={<DocumentacionSection />} />
                            <Route path="incidencias" element={<IncidenciasSection />} />
                            <Route path="horarios" element={<HorariosSection />} />
                          </Routes>
                        </WorkTimeProvider>
                      </ProtectedRoute>
                    }
                  />

                  {/* Otras rutas que no necesitan WorkTimeProvider */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                      path="/supermaster"
                      element={
                        <ProtectedRoute allowedRoles={['supermaster']}>
                          <SuperMasterDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/master"
                      element={
                        <ProtectedRoute allowedRoles={['master']}>
                          <SuperMasterDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/encargado"
                      element={
                        <ProtectedRoute allowedRoles={['encargado']}>
                          <EncargadoDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/candidato"
                      element={
                        <ProtectedRoute allowedRoles={['candidato']}>
                          {/* cambiar a dashboard candidato */}
                          <CandidatoDashboard />
                        </ProtectedRoute>
                      }
                    />
                    
                </Routes>
              </div>
              <Footer />
            </div>
          </BrowserRouter>
        </WorkTimeProvider>
      </SocketProvider>
    </AuthProvider>
  )
}

export default App
