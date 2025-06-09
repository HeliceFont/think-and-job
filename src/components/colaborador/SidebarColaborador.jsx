import React from 'react'
import { useState } from 'react'
import {
    HomeIcon,
    AcademicCapIcon,
    DocumentTextIcon,
    ShieldCheckIcon,
    ExclamationTriangleIcon,
    ClockIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline'
import { DashboardSection } from './DashboardSection'
import { FormacionSection } from './FormacionSection'
import { PRLSection } from './PRLSection'
import { DocumentacionSection } from './DocumentacionSection'
import { IncidenciasSection } from './IncidenciasSection'
import { HorariosSection } from './HorariosSection'
import { PerfilSection } from './PerfilSection'

export const SidebarColaborador = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('dashboard');

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'dashboard':
                return <DashboardSection />;
            case 'perfil':
                return <PerfilSection />;
            case 'formacion':
                return <FormacionSection />;
            case 'prl':
                return <PRLSection />;
            case 'documentacion':
                return <DocumentacionSection />;
            case 'incidencias':
                return <IncidenciasSection />;
            case 'horarios':
                return <HorariosSection />;

            default:
                return <DashboardSection />;
        }
    }

    const getLinkClassName = (sectionName) => {
        return `flex items-center p-2 text-gray-900 rounded-lg dark:text-white 
            ${activeSection === sectionName 
                ? 'bg-amber-400 text-gray-900 dark:text-gray-900' 
                : 'hover:bg-amber-400 dark:hover:bg-amber-400'
            } group`
    }

    return (
        <div className='pt-0'>
            <button
                onClick={toggleSidebar}
                className="inline-flex fixed top-8 right-2 z-50 items-center p-2 text-sm text-white rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Abrir menú</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
                </svg>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-30 bg-transparent sm:hidden" onClick={toggleSidebar}></div>
            )}

            <aside className={`fixed top-27.5 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'transform-none' : '-translate-x-full'} sm:translate-x-0`}>
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSection('dashboard');
                                }}
                                className={getLinkClassName('dashboard')}
                            >
                                <HomeIcon className={`w-5 h-5 transition duration-75 
                                    ${activeSection === 'dashboard' 
                                        ? 'text-gray-900' 
                                        : 'text-gray-900 dark:text-gray-400 group-hover:text-gray-900'
                                    } dark:group-hover:text-white`} 
                                />
                                <span className="ms-3">Dashboard</span>
                            </a>
                        </li>
                        {/* Perfil */}
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSection('perfil');
                                }}
                                className={getLinkClassName('perfil')}
                            >
                                <UserCircleIcon className={`w-5 h-5 transition duration-75 
                                    ${activeSection === 'perfil' 
                                        ? 'text-gray-900' 
                                        : 'text-gray-900 dark:text-gray-400 group-hover:text-gray-900'
                                    } dark:group-hover:text-white`}
                                />
                                <span className="ms-3">Perfil</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSection('formacion');
                                }}
                                className={getLinkClassName('formacion')}
                            >
                                <AcademicCapIcon className={`w-5 h-5 transition duration-75 
                                    ${activeSection === 'formacion' 
                                        ? 'text-gray-900' 
                                        : 'text-gray-900 dark:text-gray-400 group-hover:text-gray-900'
                                    } dark:group-hover:text-white`}
                                />
                                <span className="ms-3">Formación</span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-amber-600 bg-amber-100 rounded-full">3</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSection('prl');
                                }}
                                className={getLinkClassName('prl')}
                            >
                                <ShieldCheckIcon className={`w-5 h-5 transition duration-75 
                                    ${activeSection === 'prl' 
                                        ? 'text-gray-900' 
                                        : 'text-gray-900 dark:text-gray-400 group-hover:text-gray-900'
                                    } dark:group-hover:text-white`}
                                />
                                <span className="ms-3">PRL</span>
                            </a>
                        </li>
                        {/* Documentación */}
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSection('documentacion');
                                }}
                                className={getLinkClassName('documentacion')}
                            >
                                <DocumentTextIcon className={`w-5 h-5 transition duration-75 
                                    ${activeSection === 'documentacion' 
                                        ? 'text-gray-900' 
                                        : 'text-gray-900 dark:text-gray-400 group-hover:text-gray-900'
                                    } dark:group-hover:text-white`}
                                />
                                <span className="ms-3">Documentación</span>
                            </a>
                        </li>
                        {/* Incidencias */}
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSection('incidencias');
                                }}
                                className={getLinkClassName('incidencias')}
                            >
                                <ExclamationTriangleIcon className={`w-5 h-5 transition duration-75 
                                    ${activeSection === 'incidencias' 
                                        ? 'text-gray-900' 
                                        : 'text-gray-900 dark:text-gray-400 group-hover:text-gray-900'
                                    } dark:group-hover:text-white`}
                                />
                                <span className="ms-3">Incidencias</span>
                            </a>
                        </li>
                        {/* Horarios */}
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSection('horarios');
                                }}
                                className={getLinkClassName('horarios')}
                            >
                                <ClockIcon className={`w-5 h-5 transition duration-75 
                                    ${activeSection === 'horarios' 
                                        ? 'text-gray-900' 
                                        : 'text-gray-900 dark:text-gray-400 group-hover:text-gray-900'
                                    } dark:group-hover:text-white`}
                                />
                                <span className="ms-3">Horarios</span>
                            </a>
                        </li>
                        
                    </ul>
                </div>
            </aside>

            <div className="p-0 sm:ml-64">
                <div className="p-0  mt-0">
                    {renderSection()}
                </div>
            </div>
        </div>
    )
}
