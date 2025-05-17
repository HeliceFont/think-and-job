import React from 'react'

import ExampleDashboard from '../components/ExampleDashboard'
import { useAuth } from '@/context/AuthContext';

const AdminDashboard = () => {
    const { user } = useAuth();

    return (
        <div>

            <ExampleDashboard />
            <h1 className="text-2xl font-semibold text-gray-900">
                Panel de Admin
            </h1>
            <p className="mt-2 text-gray-600">
                Bienvenido, {user?.name}
            </p>
        </div>
    )
}

export default AdminDashboard
