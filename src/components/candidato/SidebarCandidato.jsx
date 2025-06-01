import React from 'react'
import { useState } from 'react'
import banner from '@/assets/Banner-p-800.png'
import { DashboardSection } from './DashboardSection'
import { PerfilSection } from './PerfilSection'
import { PortalEmpleoSection } from './PortalEmpleoSection'
import { DocumentosSection } from './DocumentosSection'

export const SidebarCandidato = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
    const [activeSection, setActiveSection] = useState('dashboard');

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleDropdown1 = () => setIsDropdownOpen1(!isDropdownOpen1);

    const renderSection = () => {
        switch (activeSection) {
            case 'dashboard':
                return <DashboardSection />;
            case 'perfil':
                return <PerfilSection />;
            case 'portal':
                return <PortalEmpleoSection />;
            case 'documentos':
                return <DocumentosSection />;
            // Añadir casos para otras secciones
            default:
                return <DashboardSection />;
        }
    }

    return (
        <div className='pt-0'>
            <div></div>

            <div className="flex-1 justify-end ">
                <button
                    onClick={toggleSidebar}
                    data-drawer-target="sidebar-multi-level-sidebar"
                    data-drawer-toggle="sidebar-multi-level-sidebar"
                    aria-controls="sidebar-multi-level-sidebar"
                    type="button"
                    className="inline-flex fixed top-8 right-2 z-50 items-center p-2 text-sm text-white rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                    <span className="sr-only">Open sidebar</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                        />
                    </svg>
                </button>
            </div>

            {/* Overlay para cerrar el sidebar */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-transparent sm:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            <aside id="sidebar-multi-level-sidebar" className={`fixed top-27.5 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'transform-none' : '-translate-x-full'
                } sm:translate-x-0`}
                aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a
                                href={<DashboardSection />}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSection('dashboard');
                                }}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-amber-400 dark:hover:bg-amber-400 group"
                            >
                                <svg className="w-5 h-5 text-gray-900 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href={<PerfilSection />}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSection('perfil');
                                }}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-amber-400 dark:hover:bg-amber-400 group"
                            >
                                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" height="44px" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                                </svg>
                                <span className="flex-1 ms-3 pr-2 text-left rtl:text-right whitespace-nowrap">Perfil</span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 mr-3 ms-3 text-sm font-medium text-amber-600 bg-amber-100 rounded-full dark:bg-amber-500 dark:text-amber-100">3</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSection('portal');
                                }}
                                className="flex items-start p-2 text-gray-900 rounded-lg dark:text-white hover:bg-amber-400 dark:hover:bg-amber-700 group"
                            >
                                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
                                </svg>
                                <span className="flex ml-3 whitespace-nowrap">Portal de empleo</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSection('documentos');
                                }}
                                className="flex items-start p-2 text-gray-900 rounded-lg dark:text-white hover:bg-amber-400 dark:hover:bg-amber-700 group"
                            >
                                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                                </svg>
                                <span className="flex ml-3 whitespace-nowrap">Documentos</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    {renderSection()}
                </div>
            </div>

        </div>
    )
}
