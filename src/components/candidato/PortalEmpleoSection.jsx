import React, { useState } from 'react'
import { 
    TextField, 
    Chip, 
    Dialog, 
    IconButton,
    InputAdornment
} from '@mui/material'
import { 
    Search as SearchIcon,
    FilterList as FilterIcon,
    Close as CloseIcon,
    LocationOn as LocationIcon,
    Work as WorkIcon,
    Schedule as ScheduleIcon,
    AttachMoney as MoneyIcon,
    Business as BusinessIcon
} from '@mui/icons-material'

// Datos de ejemplo - Luego se reemplazarán por datos reales de la API
const mockJobs = [
    {
        id: 1,
        title: "Desarrollador Frontend React",
        company: "Tech Solutions SA",
        location: "Santiago, Chile",
        type: "Full-time",
        category: "Tecnología",
        experience: "3-5 años",
        salary: "$1.200.000 - $2.000.000",
        posted: "Hace 2 días",
        description: "Estamos buscando un desarrollador Frontend con experiencia en React...",
        requirements: [
            "3+ años de experiencia con React",
            "Conocimientos en TypeScript",
            "Experiencia con sistemas de diseño"
        ],
        benefits: [
            "Seguro de salud",
            "Horario flexible",
            "Trabajo remoto"
        ]
    },
    {
        id: 2,
        title: "Diseñador UX/UI Senior",
        company: "Creative Studio",
        location: "Remoto",
        type: "Full-time",
        category: "Diseño",
        experience: "3-5 años",
        salary: "$1.500.000 - $2.500.000",
        posted: "Hace 1 día",
        description: "Buscamos un diseñador UX/UI con experiencia en productos digitales...",
        requirements: [
            "Portfolio demostrable",
            "Experiencia en Figma",
            "Conocimientos de Design Systems"
        ],
        benefits: [
            "Equipamiento completo",
            "Capacitaciones",
            "Seguro dental"
        ]
    },
    {
        id: 3,
        title: "Marketing Digital Manager",
        company: "Growth Agency",
        location: "Valparaíso",
        type: "Part-time",
        category: "Marketing",
        experience: "1-3 años",
        salary: "$800.000 - $1.200.000",
        posted: "Hace 3 días",
        description: "Se busca especialista en marketing digital para gestionar campañas...",
        requirements: [
            "Experiencia en Google Ads",
            "Conocimientos de SEO",
            "Manejo de redes sociales"
        ],
        benefits: [
            "Bono por rendimiento",
            "Horario flexible",
            "Oficina con snacks"
        ]
    },
    {
        id: 4,
        title: "Desarrollador Backend Python",
        company: "Data Corp",
        location: "Santiago, Chile",
        type: "Full-time",
        category: "Tecnología",
        experience: "5+ años",
        salary: "$2.500.000 - $3.500.000",
        posted: "Hace 5 días",
        description: "Buscamos desarrollador backend senior para proyectos de datos...",
        requirements: [
            "Experiencia en Python",
            "Conocimientos de AWS",
            "Bases de datos NoSQL"
        ],
        benefits: [
            "Seguro internacional",
            "Stock options",
            "Gimnasio"
        ]
    },
    {
        id: 5,
        title: "Vendedor Técnico",
        company: "Tech Hardware SA",
        location: "Concepción",
        type: "Full-time",
        category: "Ventas",
        experience: "Sin experiencia",
        salary: "$600.000 - $1.000.000",
        posted: "Hace 1 semana",
        description: "Se busca vendedor técnico para productos de hardware...",
        requirements: [
            "Conocimientos básicos de hardware",
            "Orientación al cliente",
            "Disponibilidad inmediata"
        ],
        benefits: [
            "Comisiones",
            "Capacitación continua",
            "Descuentos en productos"
        ]
    },
    {
        id: 6,
        title: "Frontend Developer Jr",
        company: "Startup Innovation",
        location: "Remoto",
        type: "Part-time",
        category: "Tecnología",
        experience: "Sin experiencia",
        salary: "$500.000 - $800.000",
        posted: "Hace 4 días",
        description: "Buscamos desarrollador junior para proyecto innovador...",
        requirements: [
            "Conocimientos de HTML, CSS y JavaScript",
            "Nociones de React",
            "Ganas de aprender"
        ],
        benefits: [
            "Mentoría senior",
            "Horario flexible",
            "Posibilidad de crecer"
        ]
    }
]

export const PortalEmpleoSection = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filters, setFilters] = useState({
        location: [],
        category: [],
        type: [],
        experience: []
    })
    const [selectedJob, setSelectedJob] = useState(null)
    const [openDialog, setOpenDialog] = useState(false)
    const [showFilters, setShowFilters] = useState(false)

    // Función para filtrar trabajos
    const getFilteredJobs = () => {
        return mockJobs.filter(job => {
            // Filtrar por término de búsqueda
            const searchMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              job.description.toLowerCase().includes(searchTerm.toLowerCase());

            // Filtrar por ubicación
            const locationMatch = filters.location.length === 0 || 
                                filters.location.includes(job.location);

            // Filtrar por categoría
            const categoryMatch = filters.category.length === 0 || 
                                filters.category.includes(job.category);

            // Filtrar por tipo
            const typeMatch = filters.type.length === 0 || 
                            filters.type.includes(job.type);

            // Filtrar por experiencia
            const experienceMatch = filters.experience.length === 0 || 
                                  filters.experience.includes(job.experience);

            return searchMatch && locationMatch && categoryMatch && typeMatch && experienceMatch;
        });
    };

    // Obtener trabajos filtrados
    const filteredJobs = getFilteredJobs();

    return (
        <div className="min-h-screen bg-gray-50 pt-"> {/* Añadido pt-20 para el espacio del header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
                {/* Cabecera con título y descripción */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-teal-900 mb-2">
                        Portal de Empleo
                    </h1>
                    <p className="text-gray-600">
                        Encuentra las mejores oportunidades laborales
                    </p>
                </div>

                {/* Buscador y filtros */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6 sticky top-28 z-10"> {/* Añadido sticky y z-10 */}
                    <div className="flex gap-4 items-center">
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Buscar empleos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon className="text-gray-400" />
                                    </InputAdornment>
                                ),
                                className: "bg-gray-50 border-none shadow-sm"
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'transparent',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'transparent',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#0F766E',
                                    },
                                },
                            }}
                        />
                        <IconButton 
                            onClick={() => setShowFilters(!showFilters)}
                            className={`${showFilters ? 'bg-amber-100 text-amber-600' : ''} hover:bg-amber-50`}
                        >
                            <FilterIcon />
                        </IconButton>
                    </div>

                    {/* Chips de filtros activos */}
                    {Object.values(filters).some(arr => arr.length > 0) && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {Object.entries(filters).map(([key, values]) =>
                                values.map((value) => (
                                    <Chip
                                        key={`${key}-${value}`}
                                        label={value}
                                        onDelete={() => {
                                            setFilters(prev => ({
                                                ...prev,
                                                [key]: prev[key].filter(v => v !== value)
                                            }))
                                        }}
                                        className="bg-teal-100 text-teal-800"
                                    />
                                ))
                            )}
                        </div>
                    )}

                    {/* Filtros adicionales */}
                    {showFilters && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Filtro de Ubicación */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Ubicación</h3>
                                    <div className="space-y-2">
                                        {["Santiago, Chile", "Remoto", "Valparaíso", "Concepción"].map(location => (
                                            <label key={location} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={filters.location.includes(location)}
                                                    onChange={() => {
                                                        setFilters(prev => ({
                                                            ...prev,
                                                            location: prev.location.includes(location)
                                                                ? prev.location.filter(l => l !== location)
                                                                : [...prev.location, location]
                                                        }))
                                                    }}
                                                    className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                                                />
                                                <span className="ml-2 text-sm text-gray-600">{location}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Filtro de Categoría */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Categoría</h3>
                                    <div className="space-y-2">
                                        {["Tecnología", "Diseño", "Marketing", "Ventas"].map(category => (
                                            <label key={category} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={filters.category.includes(category)}
                                                    onChange={() => {
                                                        setFilters(prev => ({
                                                            ...prev,
                                                            category: prev.category.includes(category)
                                                                ? prev.category.filter(c => c !== category)
                                                                : [...prev.category, category]
                                                        }))
                                                    }}
                                                    className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                                                />
                                                <span className="ml-2 text-sm text-gray-600">{category}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Filtro de Tipo */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Tipo</h3>
                                    <div className="space-y-2">
                                        {["Full-time", "Part-time", "Freelance"].map(type => (
                                            <label key={type} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={filters.type.includes(type)}
                                                    onChange={() => {
                                                        setFilters(prev => ({
                                                            ...prev,
                                                            type: prev.type.includes(type)
                                                                ? prev.type.filter(t => t !== type)
                                                                : [...prev.type, type]
                                                        }))
                                                    }}
                                                    className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                                                />
                                                <span className="ml-2 text-sm text-gray-600">{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Filtro de Experiencia */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Experiencia</h3>
                                    <div className="space-y-2">
                                        {["Sin experiencia", "1-3 años", "3-5 años", "5+ años"].map(exp => (
                                            <label key={exp} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={filters.experience.includes(exp)}
                                                    onChange={() => {
                                                        setFilters(prev => ({
                                                            ...prev,
                                                            experience: prev.experience.includes(exp)
                                                                ? prev.experience.filter(e => e !== exp)
                                                                : [...prev.experience, exp]
                                                        }))
                                                    }}
                                                    className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                                                />
                                                <span className="ml-2 text-sm text-gray-600">{exp}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Grid de ofertas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJobs.map(job => (
                        <div
                            key={job.id}
                            onClick={() => {
                                setSelectedJob(job)
                                setOpenDialog(true)
                            }}
                            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer group"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-teal-900 mb-2 group-hover:text-amber-500 transition-colors">
                                        {job.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                                        <BusinessIcon className="w-4 h-4" />
                                        <span>{job.company}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <LocationIcon className="w-4 h-4" />
                                    <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <WorkIcon className="w-4 h-4" />
                                    <span>{job.type}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <ScheduleIcon className="w-4 h-4" />
                                    <span>{job.posted}</span>
                                </div>
                            </div>
                            
                            <div className="mt-4 flex items-center gap-2 text-lg font-semibold text-amber-500">
                                <MoneyIcon />
                                <span>{job.salary}</span>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                                <span className="px-2 py-1 text-xs bg-teal-50 text-teal-600 rounded-full">
                                    {job.category}
                                </span>
                                <span className="px-2 py-1 text-xs bg-amber-50 text-amber-600 rounded-full">
                                    {job.experience}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal de detalle */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                maxWidth="md"
                fullWidth
            >
                {selectedJob && (
                    <>
                        <div className="flex justify-between items-center bg-teal-900 text-white p-4">
                            <h2 className="text-xl font-semibold">{selectedJob.title}</h2>
                            <IconButton
                                onClick={() => setOpenDialog(false)}
                                className="text-white"
                            >
                                <CloseIcon />
                            </IconButton>
                        </div>
                        
                        <div className="p-6">
                            <div className="grid gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-teal-900 mb-2">
                                        Descripción
                                    </h3>
                                    <p className="text-gray-600">
                                        {selectedJob.description}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-teal-900 mb-2">
                                        Requisitos
                                    </h3>
                                    <ul className="list-disc pl-5 text-gray-600">
                                        {selectedJob.requirements.map((req, index) => (
                                            <li key={index}>{req}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-teal-900 mb-2">
                                        Beneficios
                                    </h3>
                                    <ul className="list-disc pl-5 text-gray-600">
                                        {selectedJob.benefits.map((benefit, index) => (
                                            <li key={index}>{benefit}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 flex justify-end gap-4">
                            <button
                                onClick={() => setOpenDialog(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    // Lógica para postular
                                    console.log('Postulando a:', selectedJob.title)
                                }}
                                className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600"
                            >
                                Postular
                            </button>
                        </div>
                    </>
                )}
            </Dialog>
        </div>
    )
}
