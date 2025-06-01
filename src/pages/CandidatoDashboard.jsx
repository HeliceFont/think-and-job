import React from 'react'
import { useAuth } from '@/context/AuthContext'
import DashboardCandidato from '@/components/candidato/DashboardCandidato'


const CandidatoDashboard = () => {
    const { user } = useAuth()

    return (
        <div>
            <DashboardCandidato />
        </div>
    )
}

export default CandidatoDashboard