import React from 'react';
import { Box } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DescriptionIcon from '@mui/icons-material/Description';

export const DashboardSection = () => {
    const dashboardData = {
        aplicaciones: 12,
        entrevistas: 3,
        documentosPendientes: 2,
        cursosDisponibles: 5
    };

    const cards = [
        {
            title: 'Aplicaciones Activas',
            value: dashboardData.aplicaciones,
            icon: <WorkIcon className="text-4xl text-teal-950" />,
            bgColor: 'bg-emerald-100',
            textColor: 'text-emerald-600'
        },
        {
            title: 'Entrevistas Programadas',
            value: dashboardData.entrevistas,
            icon: <AssignmentTurnedInIcon className="text-4xl text-teal-950" />,
            bgColor: 'bg-amber-100',
            textColor: 'text-amber-600'
        },
        {
            title: 'Documentos Pendientes',
            value: dashboardData.documentosPendientes,
            icon: <DescriptionIcon className="text-4xl text-teal-950" />,
            bgColor: 'bg-red-100',
            textColor: 'text-red-500'
        },
        {
            title: 'Cursos Disponibles',
            value: dashboardData.cursosDisponibles,
            icon: <SchoolIcon className="text-4xl text-teal-950" />,
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-500'
        }
    ];

    return (
        <div className="flex-1 p-6">
            <h2 className="text-3xl font-bold text-teal-950 mb-8">
                Dashboard
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div key={index} 
                         className={`${card.bgColor} rounded-xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg`}>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold text-teal-950">
                                {card.title}
                            </h3>
                            {card.icon}
                        </div>
                        <p className={`text-3xl font-bold ${card.textColor}`}>
                            {card.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Sección de actividad reciente */}
            <div className="mt-8">
                <h3 className="text-2xl font-bold text-teal-950 mb-4">
                    Actividad Reciente
                </h3>
                <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                    <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <WorkIcon className="text-emerald-500" />
                        <div>
                            <p className="text-teal-950">
                                Aplicaste a "Desarrollador Frontend"
                                <span className="text-gray-500 text-sm ml-2">
                                    hace 2 días
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <AssignmentTurnedInIcon className="text-amber-500" />
                        <div>
                            <p className="text-teal-950">
                                Entrevista programada con "Tech Solutions"
                                <span className="text-gray-500 text-sm ml-2">
                                    mañana 10:00
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <SchoolIcon className="text-blue-500" />
                        <div>
                            <p className="text-teal-950">
                                Nuevo curso disponible: "React Avanzado"
                                <span className="text-gray-500 text-sm ml-2">
                                    hace 1 día
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
