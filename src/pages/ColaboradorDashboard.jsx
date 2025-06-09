import React from 'react'
import { useAuth } from '@/context/AuthContext'
import DashboardColaborador from '@/components/colaborador/DashboardColaborador'

const ColaboradorDashboard = () => {
    const { user } = useAuth()

    return (
        <div>
            <DashboardColaborador />
        </div>
    )
}

export default ColaboradorDashboard