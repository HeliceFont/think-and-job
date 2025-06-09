import { useState } from 'react'
import {
    AcademicCapIcon,
    DocumentTextIcon,
    ShieldCheckIcon,
    ClockIcon,
    CalendarDaysIcon,
    BanknotesIcon,
    ChartBarIcon,
    XMarkIcon
} from '@heroicons/react/24/outline'
import { TimeTracker } from './TimeTracker'

export const DashboardSection = () => {
    const [activeModal, setActiveModal] = useState(null)

    const Modal = ({ isOpen, onClose, title, children }) => {
        if (!isOpen) return null

        return (
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex min-h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="flex items-start justify-between">
                                <h3 className="text-lg font-semibold leading-6 text-gray-900">{title}</h3>
                                <button
                                    onClick={onClose}
                                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="mt-4">{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderModal = () => {
        switch (activeModal) {
            case 'formacion':
                return (
                    <Modal
                        isOpen={true}
                        onClose={() => setActiveModal(null)}
                        title="Detalle de Formación"
                    >
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-medium text-gray-900">Cursos Pendientes</h4>
                                <ul className="mt-2 space-y-2">
                                    <li className="flex items-center justify-between">
                                        <span>Seguridad en el trabajo</span>
                                        <span className="text-amber-600">Vence en 5 días</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span>Prevención de riesgos</span>
                                        <span className="text-amber-600">Vence en 7 días</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="pt-4 border-t">
                                <h4 className="font-medium text-gray-900">Progreso General</h4>
                                <div className="mt-2">
                                    <div className="relative pt-1">
                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-amber-100">
                                            <div className="w-2/3 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-500"></div>
                                        </div>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">67% completado del plan anual</p>
                                </div>
                            </div>
                        </div>
                    </Modal>
                )
            case 'horario':
                return (
                    <Modal
                        isOpen={true}
                        onClose={() => setActiveModal(null)}
                        title="Detalle de Horario"
                    >
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-medium text-gray-900">Horario Semanal</h4>
                                <div className="mt-2 grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Lunes - Viernes</p>
                                        <p className="font-medium">8:00 - 17:00</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Descanso</p>
                                        <p className="font-medium">13:00 - 14:00</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4 border-t">
                                <h4 className="font-medium text-gray-900">Horas Extra Este Mes</h4>
                                <p className="mt-2 text-2xl font-bold text-emerald-600">12h</p>
                            </div>
                        </div>
                    </Modal>
                )
            case 'documentos':
                return (
                    <Modal
                        isOpen={true}
                        onClose={() => setActiveModal(null)}
                        title="Documentos Pendientes"
                    >
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-medium text-gray-900">Documentos por Revisar</h4>
                                <ul className="mt-2 space-y-2">
                                    <li className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <DocumentTextIcon className="h-5 w-5 text-red-500" />
                                            <span>Contrato laboral</span>
                                        </div>
                                        <span className="text-red-600 text-sm">Vence hoy</span>
                                    </li>
                                    <li className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <DocumentTextIcon className="h-5 w-5 text-amber-500" />
                                            <span>Certificado médico</span>
                                        </div>
                                        <span className="text-amber-600 text-sm">Vence en 3 días</span>
                                    </li>
                                    {/* Más documentos... */}
                                </ul>
                            </div>
                            <div className="pt-4 border-t">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
                                >
                                    Ver todos los documentos
                                </button>
                            </div>
                        </div>
                    </Modal>
                )
            // Añade más casos para otros modales...
            default:
                return null
        }
    }

    return (
        // Eliminamos el padding base
        <div className="min-h-screen w-full bg-gray-50">
            {/* Ajustamos el contenedor principal para móvil */}
            <div className="max-w-[2000px] mx-auto px-0 py-0 sm:px-6 sm:py-6">
                {/* Header ajustado */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-2 sm:mb-8 px-3 sm:px-0">
                    <h1 className="text-xl sm:text-3xl font-bold text-gray-900">
                        Dashboard
                        <span className="block text-sm font-normal text-gray-500 mt-0.5">
                            Bienvenido de nuevo
                        </span>
                    </h1>
                </div>

                {/* Time Tracker ajustado */}
                <div className="w-full mb-2 sm:mb-8">
                    <TimeTracker />
                </div>

                {/* Stats Grid ajustado */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
                    {/* Formación Card */}
                    <div 
                        onClick={() => setActiveModal('formacion')}
                        className="group relative bg-white overflow-hidden rounded-lg sm:rounded-xl shadow-sm border-0 sm:border sm:border-amber-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-50"></div>
                        <div className="p-3 sm:p-5 relative">
                            <div className="flex items-center justify-between mb-2 sm:mb-4">
                                <div className="flex-shrink-0 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg p-2 sm:p-3 shadow-sm">
                                    <AcademicCapIcon className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
                                </div>
                                <span className="px-2 py-0.5 sm:px-3 sm:py-1 text-xs font-semibold bg-amber-100 text-amber-800 rounded-full shadow-sm">
                                    Pendiente
                                </span>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-gray-900 mb-1">3</p>
                                <p className="text-sm text-gray-600">Cursos por completar</p>
                            </div>
                            <div className="mt-4">
                                <div className="relative pt-1">
                                    <div className="overflow-hidden h-2 text-xs flex rounded bg-amber-100">
                                        <div 
                                            style={{ width: "67%" }}
                                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-amber-400 to-amber-500"
                                        ></div>
                                    </div>
                                </div>
                                <p className="mt-1 text-xs text-gray-500">67% completado</p>
                            </div>
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-1 hover:bg-gray-100 rounded-full">
                                    <ChartBarIcon className="w-4 h-4 text-gray-400" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Horario Card - aplicar los mismos cambios */}
                    <div 
                        onClick={() => setActiveModal('horario')}
                        className="group relative bg-white overflow-hidden rounded-lg sm:rounded-xl shadow-sm border-0 sm:border sm:border-teal-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-transparent opacity-50"></div>
                        <div className="p-3 sm:p-5 relative">
                            <div className="flex items-center justify-between mb-2 sm:mb-4">
                                <div className="flex-shrink-0 bg-gradient-to-br from-teal-100 to-teal-50 rounded-lg p-2 sm:p-3 shadow-sm">
                                    <ClockIcon className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600" />
                                </div>
                                <span className="px-2 py-0.5 sm:px-3 sm:py-1 text-xs font-semibold bg-teal-100 text-teal-800 rounded-full shadow-sm">
                                    Hoy
                                </span>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-gray-900 mb-1">8:00 - 17:00</p>
                                <p className="text-sm text-gray-600">Horario laboral</p>
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                <CalendarDaysIcon className="h-4 w-4 text-teal-500" />
                                <span className="text-xs text-teal-600">Turno mañana</span>
                            </div>
                        </div>
                    </div>

                    {/* Documentos Card */}
                    <div className="group relative bg-white overflow-hidden rounded-lg sm:rounded-xl shadow-sm border-0 sm:border sm:border-red-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-50"></div>
                        <div className="p-3 sm:p-5 relative">
                            <div className="flex items-center justify-between mb-2 sm:mb-4">
                                <div className="flex-shrink-0 bg-gradient-to-br from-red-100 to-red-50 rounded-lg p-2 sm:p-3 shadow-sm">
                                    <DocumentTextIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                                </div>
                                <span className="px-2 py-0.5 sm:px-3 sm:py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full shadow-sm">
                                    Urgente
                                </span>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-gray-900 mb-1">5</p>
                                <p className="text-sm text-gray-600">Documentos pendientes</p>
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                <span className="text-xs text-red-600 font-medium">
                                    ⚠️ 2 documentos vencen hoy
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Más tarjetas... */}
                </div>

                {/* Render the modal */}
                {renderModal()}

                {/* Actividad Reciente ajustada */}
                <div className="mt-4 sm:mt-8">
                    <div className="bg-white shadow-sm rounded-lg sm:rounded-xl border-0 sm:border border-gray-100">
                        {/* ... contenido ... */}
                    </div>
                </div>
            </div>
        </div>
    )
}