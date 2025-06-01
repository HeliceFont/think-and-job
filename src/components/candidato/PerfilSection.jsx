import React, { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { EyeIcon, XMarkIcon, CalendarIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline'

export const PerfilSection = () => {
    const [activeTab, setActiveTab] = useState('perfil')

    const tabs = [
        { id: 'perfil', name: 'Datos Personales' },
        { id: 'adicional', name: 'Información Adicional' },
        { id: 'contrato', name: 'Datos Para Tu Contrato' },
        { id: 'password', name: 'Cambiar Contraseña' },
    ]

    const handleSwipe = (direction) => {
        const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
        if (direction === 'left' && currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1].id);
        } else if (direction === 'right' && currentIndex > 0) {
            setActiveTab(tabs[currentIndex - 1].id);
        }
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => handleSwipe('left'),
        onSwipedRight: () => handleSwipe('right'),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    // Agregar estos arrays de opciones
    const regiones = ["Región Metropolitana", "Valparaíso", "Biobío" /* etc */]
    const sistemaSalud = ["Fonasa", "Isapre"]
    const afp = ["AFP Capital", "AFP Cuprum", "AFP Habitat", "AFP Modelo", "AFP PlanVital", "AFP ProVida", "IPS"]
    const estadoCivil = ["Soltero/a", "Casado/a", "Divorciado/a", "Viudo/a"]
    const licenciasConducir = ["No poseo", "Clase A1", "Clase A2", "Clase B", "Clase C", "Clase D"]

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-0m:px-6 lg:px-8 py-10">
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-teal-950 text-center mb-8">
                            Mi Perfil
                        </h2>

                        {/* Tabs de navegación responsive con swipe */}
                        <div className="border-b border-gray-200" {...handlers}>
                            <div className="overflow-x-auto">
                                <nav className="-mb-px flex space-x-4 sm:space-x-8 min-w-full p-1 tab-transition"
                                    aria-label="Tabs"
                                    style={{ scrollbarWidth: 'none' }}>
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`
                                                whitespace-nowrap py-3 px-2 sm:px-4 border-b-2 font-medium text-xs sm:text-sm
                                                flex-shrink-0 flex-grow sm:flex-grow-0
                                                ${activeTab === tab.id
                                                    ? 'border-amber-500 text-amber-600'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                }
                                            `}
                                        >
                                            {tab.name}
                                        </button>
                                    ))}
                                </nav>
                                <div className="scroll-indicator" />
                            </div>
                        </div>

                        {/* Contenido con transición */}
                        <div className="mt-8 flex justify-center tab-transition">
                            <div className="w-full max-w-2xl">
                                {/* Tab Datos Personales existente */}
                                {activeTab === 'perfil' && (
                                    <form className="space-y-6">
                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            <div>
                                                <label className="block text-sm font-medium text-teal-950">
                                                    Nombre*
                                                </label>
                                                <input
                                                    type="text"
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                                    placeholder="Nombre"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-teal-950">
                                                    Primer Apellido*
                                                </label>
                                                <input
                                                    type="text"
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                                    placeholder="Primer Apellido"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-teal-950">
                                                    Segundo Apellido
                                                </label>
                                                <input
                                                    type="text"
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                                    placeholder="Segundo Apellido"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-teal-950">
                                                    Teléfono*
                                                </label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-700 sm:text-sm">
                                                        +56
                                                    </span>
                                                    <input
                                                        type="tel"
                                                        className="block w-full rounded-r-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                                        placeholder="Teléfono"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-sm font-medium text-teal-950">
                                                    Email*
                                                </label>
                                                <input
                                                    type="email"
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                                    placeholder="ejemplo@correo.com"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-teal-950">
                                                    Región*
                                                </label>
                                                <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm">
                                                    <option value="">Selecciona una región</option>
                                                    {regiones.map(region => (
                                                        <option key={region} value={region}>{region}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-teal-950">
                                                    Provincia*
                                                </label>
                                                <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm">
                                                    <option value="">Selecciona una provincia</option>
                                                    {/* Opciones dinámicas según región */}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-teal-950">
                                                    Comuna*
                                                </label>
                                                <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm">
                                                    <option value="">Selecciona una comuna</option>
                                                    {/* Opciones dinámicas según provincia */}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-amber-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                                            >
                                                Guardar cambios
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {/* Tab Información Adicional */}
                                {activeTab === 'adicional' && (
                                    <form className="space-y-6">
                                        <div className="grid grid-cols-1 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-teal-950">
                                                    Nacionalidad*
                                                </label>
                                                <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm">
                                                    <option value="">Selecciona una opción</option>
                                                    {/* Agregar opciones */}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-teal-950">
                                                    Sexo*
                                                </label>
                                                <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm">
                                                    <option value="">Selecciona una opción</option>
                                                    <option value="M">Masculino</option>
                                                    <option value="F">Femenino</option>
                                                    <option value="O">Otro</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-teal-950">
                                                    Fecha de Nacimiento*
                                                </label>
                                                <div className="mt-1 relative">
                                                    <input
                                                        type="date"
                                                        className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                                    />
                                                    <CalendarIcon className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-teal-950">
                                                    Foto RUT anverso y reverso*
                                                </label>
                                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                    <div className="space-y-1 text-center">
                                                        <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                        <div className="flex text-sm text-gray-600">
                                                            <label className="relative cursor-pointer rounded-md font-medium text-amber-600 hover:text-amber-500">
                                                                <span>Seleccionar archivo</span>
                                                                <input type="file" className="sr-only" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-amber-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-amber-600">
                                                Guardar cambios
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {/* Tab Datos Para Tu Contrato */}
                                {activeTab === 'contrato' && (
                                    <form className="space-y-6">
                                        <div className="grid grid-cols-1 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-teal-950">
                                                    RUT/RUN*
                                                </label>
                                                <input
                                                    type="text"
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                                    placeholder="12.345.678-9"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-teal-950">
                                                    Banco*
                                                </label>
                                                <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm">
                                                    <option value="">Selecciona una opción</option>
                                                    {/* Agregar bancos */}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-teal-950">
                                                    Tipo de Cuenta*
                                                </label>
                                                <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm">
                                                    <option value="">Selecciona una opción</option>
                                                    <option value="corriente">Cuenta Corriente</option>
                                                    <option value="vista">Cuenta Vista</option>
                                                    <option value="rut">Cuenta RUT</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-teal-950">
                                                    Número de Cuenta Bancaria*
                                                </label>
                                                <input
                                                    type="text"
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                                    placeholder="123456789"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-teal-950">
                                                    AFP o IPS*
                                                </label>
                                                <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm">
                                                    <option value="">Selecciona AFP o IPS</option>
                                                    {afp.map(option => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-teal-950">
                                                    Sistema de Salud*
                                                </label>
                                                <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm">
                                                    <option value="">Selecciona sistema de salud</option>
                                                    {sistemaSalud.map(option => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-teal-950">
                                                    Estado Civil*
                                                </label>
                                                <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm">
                                                    <option value="">Selecciona estado civil</option>
                                                    {estadoCivil.map(option => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-teal-950">
                                                    Calle*
                                                </label>
                                                <input
                                                    type="text"
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                                    placeholder="Nombre de la calle y número"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-teal-950">
                                                    Departamento
                                                </label>
                                                <input
                                                    type="text"
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                                    placeholder="Número de departamento (opcional)"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-teal-950">
                                                    Permiso de Conducir
                                                </label>
                                                <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm">
                                                    <option value="">Selecciona tipo de licencia</option>
                                                    {licenciasConducir.map(option => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Agregar campos adicionales del contrato */}
                                        </div>
                                        <div className="flex justify-end">
                                            <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-amber-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-amber-600">
                                                Guardar cambios
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {/* Tab Cambiar Contraseña */}
                                {activeTab === 'password' && (
                                    <form className="space-y-6 max-w-md">
                                        <div>
                                            <label className="block text-sm font-medium text-teal-950">
                                                Contraseña Actual*
                                            </label>
                                            <div className="mt-1 relative">
                                                <input
                                                    type="password"
                                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                                    placeholder="••••••••"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                >
                                                    <EyeIcon className="h-5 w-5 text-gray-400" />
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-teal-950">
                                                Nueva Contraseña*
                                            </label>
                                            <div className="mt-1 relative">
                                                <input
                                                    type="password"
                                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                                    placeholder="••••••••"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                >
                                                    <EyeIcon className="h-5 w-5 text-gray-400" />
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-teal-950">
                                                Repetir Contraseña*
                                            </label>
                                            <div className="mt-1 relative">
                                                <input
                                                    type="password"
                                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                                    placeholder="••••••••"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                >
                                                    <EyeIcon className="h-5 w-5 text-gray-400" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-amber-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                                            >
                                                Cambiar contraseña
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}