import { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useDropzone } from 'react-dropzone'
import { regiones, comunasPorRegion, categoriasLaborales } from '@/data/chile'
import favicon from '@/assets/logo.svg'
import { DocumentArrowUpIcon } from '@heroicons/react/24/outline'
import chileFlag from '@/assets/flags/chile.svg'

const Register = () => {
    const navigate = useNavigate()
    const { register } = useAuth()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        cv: null,
        telefono: '',
        rut: '',
        email: '',
        categoriaLaboral: '',
        password: '',
        passwordConfirm: '',
        region: '',
        comuna: '',
        terminosAceptados: false,
        politicaPrivacidad: false,
        politicaComunicaciones: false
    })

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        // Validaciones básicas
        if (formData.password !== formData.passwordConfirm) {
            setError('Las contraseñas no coinciden')
            setLoading(false)
            return
        }

        if (!formData.terminosAceptados || !formData.politicaPrivacidad) {
            setError('Debes aceptar los términos y la política de privacidad')
            setLoading(false)
            return
        }

        try {
            const formDataToSend = new FormData()
            // Añadir todos los campos al FormData
            Object.keys(formData).forEach(key => {
                if (key === 'cv' && formData[key]) {
                    formDataToSend.append(key, formData[key])
                } else if (key !== 'cv') {
                    formDataToSend.append(key, formData[key])
                }
            })

            await register(formDataToSend)
            navigate('/login')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0]
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB límite
                setError('El archivo no debe superar los 5MB')
                return
            }
            setFormData(prev => ({
                ...prev,
                cv: file
            }))
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        maxFiles: 1
    })

    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-8 md:py-12">
            <div className="flex flex-col items-center px-6 mx-auto max-w-4xl">
                <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src={favicon} alt="logo" />
                    Think & Job
                </Link>

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-xl  font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-2">
                                Regístrate
                            </h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                En Think and Job te ayudamos a dar el siguiente paso en tu carrera. 
                                Nuestra bolsa de trabajo está pensada para conectar tu talento con oportunidades reales y cercanas.
                            </p>
                        </div>

                        {error && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {error}
                            </div>
                        )}

                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            {/* Datos Personales */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Nombre *
                                    </label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        id="nombre"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="primerApellido" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Primer Apellido *
                                    </label>
                                    <input
                                        type="text"
                                        name="primerApellido"
                                        id="primerApellido"
                                        value={formData.primerApellido}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="segundoApellido" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Segundo Apellido
                                    </label>
                                    <input
                                        type="text"
                                        name="segundoApellido"
                                        id="segundoApellido"
                                        value={formData.segundoApellido}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="rut" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        RUT *
                                    </label>
                                    <input
                                        type="text"
                                        name="rut"
                                        id="rut"
                                        value={formData.rut}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Datos de Contacto */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        E-mail *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Teléfono *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <img 
                                                src={chileFlag} 
                                                alt="Bandera de Chile" 
                                                className="w-4 h-4 mr-1"
                                            />
                                            <span className="text-gray-500 sm:text-sm">+56</span>
                                        </div>
                                        <input
                                            type="tel"
                                            name="telefono"
                                            id="telefono"
                                            value={formData.telefono}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full pl-20 p-2.5"
                                            pattern="[0-9]{9}"
                                            maxLength="9"
                                            placeholder="912345678"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Ubicación */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="region" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Región *
                                    </label>
                                    <select
                                        name="region"
                                        id="region"
                                        value={formData.region}
                                        onChange={(e) => {
                                            handleInputChange(e)
                                            setFormData(prev => ({ ...prev, comuna: '' }))
                                        }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5"
                                        required
                                    >
                                        <option value="">Selecciona una región</option>
                                        {regiones.map(region => (
                                            <option key={region.id} value={region.id}>
                                                {region.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="comuna" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Comuna *
                                    </label>
                                    <select
                                        name="comuna"
                                        id="comuna"
                                        value={formData.comuna}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5"
                                        required
                                        disabled={!formData.region}
                                    >
                                        <option value="">Selecciona una comuna</option>
                                        {formData.region && Array.from(new Set(
                                            comunasPorRegion[formData.region].flatMap(p => p.comunas)
                                        )).map((comuna, index) => (
                                            <option key={`${formData.region}-${index}`} value={comuna}>
                                                {comuna}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Información Laboral */}
                            <div>
                                <label htmlFor="categoriaLaboral" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Categoría Laboral *
                                </label>
                                <select
                                    name="categoriaLaboral"
                                    id="categoriaLaboral"
                                    value={formData.categoriaLaboral}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5"
                                    required
                                >
                                    <option value="">Selecciona una categoría</option>
                                    {categoriasLaborales.map(categoria => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* CV */}
                            <div className="space-y-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Currículum Vitae
                                </label>
                                <div 
                                    {...getRootProps()} 
                                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                                        ${isDragActive 
                                            ? 'border-amber-500 bg-amber-50' 
                                            : 'border-gray-300 hover:border-amber-400'
                                        }`}
                                >
                                    <input {...getInputProps()} />
                                    <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    {formData.cv ? (
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-600">Archivo seleccionado:</p>
                                            <p className="text-amber-600 font-medium">{formData.cv.name}</p>
                                        </div>
                                    ) : (
                                        <>
                                            <p className="mt-2 text-sm text-gray-600">
                                                {isDragActive 
                                                    ? 'Suelta el archivo aquí...'
                                                    : 'Arrastra y suelta tu CV aquí, o haz clic para seleccionar'
                                                }
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                PDF, DOC o DOCX (Máx. 5MB)
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Contraseñas */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Contraseña *
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="passwordConfirm" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Repetir Contraseña *
                                    </label>
                                    <input
                                        type="password"
                                        name="passwordConfirm"
                                        id="passwordConfirm"
                                        value={formData.passwordConfirm}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Términos y Condiciones */}
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            type="checkbox"
                                            name="terminosAceptados"
                                            id="terminosAceptados"
                                            checked={formData.terminosAceptados}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-amber-300"
                                            required
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terminosAceptados" className="font-light text-gray-500 dark:text-gray-300">
                                            Acepto los <a href="#" className="font-medium text-amber-600 hover:underline">Términos y Condiciones</a>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            type="checkbox"
                                            name="politicaPrivacidad"
                                            id="politicaPrivacidad"
                                            checked={formData.politicaPrivacidad}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-amber-300"
                                            required
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="politicaPrivacidad" className="font-light text-gray-500 dark:text-gray-300">
                                            Acepto la <a href="#" className="font-medium text-amber-600 hover:underline">Política de Privacidad</a>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            type="checkbox"
                                            name="politicaComunicaciones"
                                            id="politicaComunicaciones"
                                            checked={formData.politicaComunicaciones}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-amber-300"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="politicaComunicaciones" className="font-light text-gray-500 dark:text-gray-300">
                                            Acepto recibir comunicaciones según la <a href="#" className="font-medium text-amber-600 hover:underline">Política de Comunicaciones</a>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full text-white bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Registrando...' : 'Registrarse'}
                            </button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                ¿Ya tienes una cuenta?{' '}
                                <Link to="/login" className="font-medium text-amber-600 hover:underline dark:text-amber-500">
                                    Inicia sesión
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register