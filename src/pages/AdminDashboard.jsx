import React from 'react'

import ExampleDashboard from '@/components/ExampleDashboard'
import { useAuth } from '@/context/AuthContext';
import DashboardAdmin from '@/components/admin/DashboardAdmin';

const AdminDashboard = () => {
    const { user } = useAuth();

    return (
        <div>

            <DashboardAdmin />
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
