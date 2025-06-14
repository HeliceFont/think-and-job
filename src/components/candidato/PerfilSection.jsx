import React, { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { EyeIcon, XMarkIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { regiones, provinciasPorRegion, comunasPorRegion } from "../../data/chile.js";

export const PerfilSection = () => {
    const [activeTab, setActiveTab] = useState('perfil')
    const [formData, setFormData] = useState({
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        telefono: '',
        email: '',
        region: '',
        provincia: '',
        comuna: '',
        nacionalidad: '',
        sexo: '',
        fechaNacimiento: '',
        fotoRut: null,
        rut: '',
        banco: '',
        tipoCuenta: '',
        numeroCuenta: '',
        afpIps: '',
        sistemaSalud: '',
        estadoCivil: '',
        calle: '',
        departamento: '',
        permisoConducir: '',
        contraseñaActual: '',
        nuevaContraseña: '',
        repetirContraseña: ''
    })
    const [selectedRegion, setSelectedRegion] = useState('')
    const [availableComunas, setAvailableComunas] = useState([])
    const [availableProvincias, setAvailableProvincias] = useState([])
    const [selectedProvincia, setSelectedProvincia] = useState('')

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
    const sistemaSalud = ["Fonasa", "Isapre"]
    const afp = ["AFP Capital", "AFP Cuprum", "AFP Habitat", "AFP Modelo", "AFP PlanVital", "AFP ProVida", "IPS"]
    const estadoCivil = ["Soltero/a", "Casado/a", "Divorciado/a", "Viudo/a"]
    const licenciasConducir = ["No poseo", "Clase A1", "Clase A2", "Clase B", "Clase C", "Clase D"]

    const bancos = [
        "Banco de Chile",
        "Banco Estado",
        "Banco Santander",
        "Banco BCI",
        "Banco Itaú",
        "Scotiabank",
        "Banco Security",
        "Banco Falabella",
        "Banco Ripley",
        "Banco Internacional",
        "Banco BICE",
        "Banco Consorcio"
    ];

    const nacionalidades = [
        "Chilena",
        "Argentina",
        "Boliviana",
        "Colombiana",
        "Ecuatoriana",
        "Paraguaya",
        "Peruana",
        "Uruguaya",
        "Venezolana",
        "Otra"
    ];

    const getDateLimits = () => {
        const today = new Date()
        const maxDate = today.toISOString().split('T')[0] // Fecha actual
        const minDate = '1950-01-01' // Fecha mínima permitida
        return { maxDate, minDate }
    }

    const handleRegionChange = (e) => {
        const regionId = e.target.value;
        setSelectedRegion(regionId);
        setSelectedProvincia('');
        setFormData(prev => ({
            ...prev,
            region: regionId,
            provincia: '',
            comuna: ''
        }));
        
        if (regionId) {
            // Usar provinciasPorRegion en lugar de comunasPorRegion
            setAvailableProvincias(provinciasPorRegion[regionId] || []);
        } else {
            setAvailableProvincias([]);
        }
        setAvailableComunas([]);
    };

    const handleProvinciaChange = (e) => {
        const provinciaId = e.target.value;
        setSelectedProvincia(provinciaId);
        setFormData(prev => ({
            ...prev,
            provincia: provinciaId,
            comuna: ''
        }));
        
        if (provinciaId) {
            // Usar el array de comunas directamente desde comunasPorRegion
            const comunasDisponibles = comunasPorRegion[selectedRegion]
                .find(p => p.id === provinciaId)?.comunas || [];

            // Convertir las comunas al formato necesario
            const comunasFormateadas = comunasDisponibles.map((comuna, index) => ({
                id: `${provinciaId}${index + 1}`,
                nombre: comuna
            }));
            
            setAvailableComunas(comunasFormateadas);
        } else {
            setAvailableComunas([]);
        }
    };

    return (
        <div className="bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white rounded-lg shadow">
                    <div className="p-4 sm:p-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-teal-950 text-center mb-4">
                            Mi Perfil
                        </h2>

                        {/* Tabs de navegación */}
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

                        {/* Contenido */}
                        <div className="mt-4">
                            <div className="w-full max-w-2xl mx-auto">
                                {/* Tab Datos Personales existente */}
                                {activeTab === 'perfil' && (
                                    <form className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Nombre */}
                                            <div className="w-full">
                                                <label className="block text-sm font-medium text-teal-950 mb-1">
                                                    Nombre*
                                                </label>
                                                <input
                                                    type="text"
                                                    name="nombre"
                                                    value={formData.nombre}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        nombre: e.target.value
                                                    }))}
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 text-sm"
                                                    placeholder="Nombre"
                                                />
                                            </div>

                                            {/* Primer Apellido */}
                                            <div className="w-full">
                                                <label className="block text-sm font-medium text-teal-950 mb-1">
                                                    Primer Apellido*
                                                </label>
                                                <input
                                                    type="text"
                                                    name="primerApellido"
                                                    value={formData.primerApellido}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        primerApellido: e.target.value
                                                    }))}
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 text-sm"
                                                    placeholder="Primer Apellido"
                                                />
                                            </div>

                                            {/* Segundo Apellido */}
                                            <div className="w-full">
                                                <label className="block text-sm font-medium text-teal-950 mb-1">
                                                    Segundo Apellido
                                                </label>
                                                <input
                                                    type="text"
                                                    name="segundoApellido"
                                                    value={formData.segundoApellido}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        segundoApellido: e.target.value
                                                    }))}
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 text-sm"
                                                    placeholder="Segundo Apellido"
                                                />
                                            </div>

                                            {/* Teléfono */}
                                            <div className="w-full">
                                                <label className="block text-sm font-medium text-teal-950 mb-1">
                                                    Teléfono*
                                                </label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-700 sm:text-sm">
                                                        +56
                                                    </span>
                                                    <input
                                                        type="tel"
                                                        name="telefono"
                                                        value={formData.telefono}
                                                        onChange={(e) => setFormData(prev => ({
                                                            ...prev,
                                                            telefono: e.target.value
                                                        }))}
                                                        className="block w-full rounded-r-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                                        placeholder="Teléfono"
                                                    />
                                                </div>
                                            </div>

                                            {/* Email (full width) */}
                                            <div className="w-full">
                                                <label className="block text-sm font-medium text-teal-950 mb-1">
                                                    Email*
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        email: e.target.value
                                                    }))}
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 text-sm"
                                                    placeholder="ejemplo@correo.com"
                                                />
                                            </div>

                                            {/* Región */}
                                            <div className="w-full">
                                                <label className="block text-sm font-medium text-teal-950 mb-1">
                                                    Región*
                                                </label>
                                                <select
                                                    name="region"
                                                    value={selectedRegion}
                                                    onChange={handleRegionChange}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                                >
                                                    <option value="">Selecciona una región</option>
                                                    {regiones.map(region => (
                                                        <option key={region.id} value={region.id}>
                                                            {region.nombre}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Provincia */}
                                            <div className="w-full">
                                                <label className="block text-sm font-medium text-teal-950 mb-1">
                                                    Provincia*
                                                </label>
                                                <select
                                                    name="provincia"
                                                    value={selectedProvincia}
                                                    onChange={handleProvinciaChange}
                                                    disabled={!selectedRegion}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                                >
                                                    <option value="">Selecciona una provincia</option>
                                                    {availableProvincias.map(provincia => (
                                                        <option key={provincia.id} value={provincia.id}>
                                                            {provincia.nombre}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Comuna */}
                                            <div className="w-full">
                                                <label className="block text-sm font-medium text-teal-950 mb-1">
                                                    Comuna*
                                                </label>
                                                <select
                                                    name="comuna"
                                                    value={formData.comuna}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        comuna: e.target.value
                                                    }))}
                                                    disabled={!selectedProvincia}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                                >
                                                    <option value="">Selecciona una comuna</option>
                                                    {availableComunas.map(comuna => (
                                                        <option key={comuna.id} value={comuna.nombre}>
                                                            {comuna.nombre}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Button */}
                                        <div className="flex justify-end pt-2">
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-amber-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
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
                                                <select
                                                    name="nacionalidad"
                                                    value={formData.nacionalidad}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        nacionalidad: e.target.value
                                                    }))}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                                >
                                                    <option value="">Selecciona una nacionalidad</option>
                                                    {nacionalidades.map(nacionalidad => (
                                                        <option key={nacionalidad} value={nacionalidad}>
                                                            {nacionalidad}
                                                        </option>
                                                    ))}
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
                                                <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-teal-950">
                                                    Fecha de Nacimiento*
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="date"
                                                        id="fechaNacimiento"
                                                        name="fechaNacimiento"
                                                        value={formData.fechaNacimiento}
                                                        onChange={(e) => setFormData(prev => ({
                                                            ...prev,
                                                            fechaNacimiento: e.target.value
                                                        }))}
                                                        min={getDateLimits().minDate}
                                                        max={getDateLimits().maxDate}
                                                        className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                                    />
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
                                                    name="rut"
                                                    value={formData.rut}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        rut: e.target.value
                                                    }))}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                                    placeholder="12.345.678-9"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-teal-950">
                                                    Banco*
                                                </label>
                                                <select
                                                    name="banco"
                                                    value={formData.banco}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        banco: e.target.value
                                                    }))}
                                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                                                >
                                                    <option value="">Selecciona un banco</option>
                                                    {bancos.map(banco => (
                                                        <option key={banco} value={banco}>
                                                            {banco}
                                                        </option>
                                                    ))}
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
                                                    name="numeroCuenta"
                                                    value={formData.numeroCuenta}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        numeroCuenta: e.target.value
                                                    }))}
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
                                                    name="calle"
                                                    value={formData.calle}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        calle: e.target.value
                                                    }))}
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
                                                    name="departamento"
                                                    value={formData.departamento}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        departamento: e.target.value
                                                    }))}
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
                                                    name="contraseñaActual"
                                                    value={formData.contraseñaActual}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        contraseñaActual: e.target.value
                                                    }))}
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
                                                    name="nuevaContraseña"
                                                    value={formData.nuevaContraseña}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        nuevaContraseña: e.target.value
                                                    }))}
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
                                                    name="repetirContraseña"
                                                    value={formData.repetirContraseña}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        repetirContraseña: e.target.value
                                                    }))}
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