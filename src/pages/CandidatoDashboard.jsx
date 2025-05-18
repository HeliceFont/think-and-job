import React from 'react'
import { useAuth } from '@/context/AuthContext'
import DashboardCandidato from '@/components/candidato/DashboardCandidato'


const CandidatoDashboard = () => {
    const { user } = useAuth()

    return (
        <div>
            <DashboardCandidato />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Panel de candidato
                </h1>
                <p className="mt-2 text-gray-600">
                    Bienvenido, {user?.name}
                </p>
            </div>
        </div>
    )
}

export default CandidatoDashboard