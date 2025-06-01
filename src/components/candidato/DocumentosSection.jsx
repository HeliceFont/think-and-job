import React, { useState } from 'react'
import { 
    DocumentTextIcon, 
    AcademicCapIcon, 
    CurrencyDollarIcon,
    ClipboardDocumentListIcon,
    ArrowDownTrayIcon
} from '@heroicons/react/24/outline'

// Datos de ejemplo - Luego se reemplazarán por datos reales
const mockDocuments = {
    contratos: [
        { id: 1, name: 'Contrato de trabajo 2024', date: '01/01/2024', size: '245 KB' },
        { id: 2, name: 'Anexo modificación horaria', date: '15/02/2024', size: '125 KB' },
    ],
    formaciones: [
        { id: 1, name: 'Certificado React Advanced', date: '10/12/2023', size: '1.2 MB' },
        { id: 2, name: 'Diploma UX/UI Design', date: '05/01/2024', size: '890 KB' },
    ],
    remuneraciones: [
        { id: 1, name: 'Comprobante Enero 2024', date: '31/01/2024', size: '156 KB' },
        { id: 2, name: 'Comprobante Febrero 2024', date: '29/02/2024', size: '158 KB' },
    ],
    liquidaciones: [
        { id: 1, name: 'Liquidación Enero 2024', date: '31/01/2024', size: '245 KB' },
        { id: 2, name: 'Liquidación Febrero 2024', date: '29/02/2024', size: '242 KB' },
    ]
}

export const DocumentosSection = () => {
    const [activeTab, setActiveTab] = useState('contratos')

    const tabs = [
        { id: 'contratos', name: 'Contratos', icon: DocumentTextIcon },
        { id: 'formaciones', name: 'Formaciones', icon: AcademicCapIcon },
        { id: 'remuneraciones', name: 'Remuneraciones', icon: CurrencyDollarIcon },
        { id: 'liquidaciones', name: 'Liquidaciones', icon: ClipboardDocumentListIcon },
    ]

    return (
        <div className="min-h-[calc(100vh-7rem)] bg-gray-50 w-full">
            <div className="h-full w-full p-2 sm:p-4">
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-3 sm:p-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-teal-900 text-center mb-4">
                            Mis Documentos
                        </h2>

                        {/* Tabs de navegación */}
                        <div className="border-b border-gray-200 mb-4">
                            <div className="flex overflow-x-auto">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`
                                            inline-flex items-center gap-2 py-2 px-3 text-sm font-medium text-center border-b-2 
                                            ${activeTab === tab.id
                                                ? 'border-amber-500 text-amber-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }
                                        `}
                                    >
                                        <tab.icon className="h-5 w-5" />
                                        {tab.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Lista de documentos */}
                        <div className="mt-2">
                            <ul className="divide-y divide-gray-100">
                                {mockDocuments[activeTab].map((document) => (
                                    <li key={document.id} className="py-3">
                                        <div className="flex items-center justify-between">
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-teal-900">
                                                    {document.name}
                                                </p>
                                                <div className="mt-1 flex items-center gap-3">
                                                    <p className="text-xs text-gray-500">
                                                        Subido el {document.date}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {document.size}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                className="ml-3 flex items-center gap-1 rounded-md bg-amber-50 px-2.5 py-1.5 text-xs font-semibold text-amber-600 hover:bg-amber-100"
                                            >
                                                <ArrowDownTrayIcon className="h-4 w-4" />
                                                Descargar
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
