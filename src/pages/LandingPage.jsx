import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Bienvenido a Think & Job
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Sistema de gestión empresarial
          </p>
          <div className="mt-8">
            <Link
              to="/login"
              className="inline-block bg-amber-500 text-white px-6 py-3 rounded-md font-medium hover:bg-amber-600"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
