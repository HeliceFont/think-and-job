import { useState } from 'react'
import { Link } from 'react-router-dom'
import favicon from '@/assets/logo.svg'
import { EnvelopeIcon, KeyIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

const STEPS = {
    EMAIL: 'email',
    CODE: 'code',
    PASSWORD: 'password'
}

const RecuperarPassword = () => {
    const [currentStep, setCurrentStep] = useState(STEPS.EMAIL)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        email: '',
        confirmEmail: '',
        code: '',
        password: '',
        passwordConfirm: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmitEmail = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        if (formData.email !== formData.confirmEmail) {
            setError('Los correos electrónicos no coinciden')
            setLoading(false)
            return
        }

        try {
            // Llamada a la API para enviar el código
            await fetch('/api/auth/recover-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email })
            })
            setCurrentStep(STEPS.CODE)
        } catch (err) {
            setError('Error al enviar el código de recuperación')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmitCode = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            // Validar el código
            const response = await fetch('/api/auth/verify-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email: formData.email,
                    code: formData.code 
                })
            })
            if (response.ok) {
                setCurrentStep(STEPS.PASSWORD)
            } else {
                setError('Código inválido')
            }
        } catch (err) {
            setError('Error al verificar el código')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmitPassword = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        if (formData.password !== formData.passwordConfirm) {
            setError('Las contraseñas no coinciden')
            setLoading(false)
            return
        }

        try {
            // Cambiar contraseña
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    code: formData.code,
                    password: formData.password
                })
            })
            if (response.ok) {
                // Redirigir al login
                window.location.href = '/login?message=password-updated'
            } else {
                setError('Error al cambiar la contraseña')
            }
        } catch (err) {
            setError('Error al procesar la solicitud')
        } finally {
            setLoading(false)
        }
    }

    const renderStep = () => {
        switch (currentStep) {
            case STEPS.EMAIL:
                return (
                    <form onSubmit={handleSubmitEmail} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                E-mail*
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 mr-2 ml-2 pr-3 flex items-center pointer-events-none">
                                    <EnvelopeIcon className="h-8 w-8 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="h-12 pl-10 block w-full text-teal-950 rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-700">
                                Confirmar e-mail*
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 mr-2 ml-2 pr-3 flex items-center pointer-events-none">
                                    <EnvelopeIcon className="h-8 w-8 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    name="confirmEmail"
                                    id="confirmEmail"
                                    value={formData.confirmEmail}
                                    onChange={handleInputChange}
                                    className="h-12 pl-10 block w-full rounded-lg text-teal-950 border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-teal-950 bg-amber-400 hover:bg-teal-800 hover:text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                        >
                            {loading ? 'Enviando...' : 'Enviar código de recuperación'}
                        </button>
                    </form>
                )

            case STEPS.CODE:
                return (
                    <form onSubmit={handleSubmitCode} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                                Código de Recuperación*
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <KeyIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="code"
                                    id="code"
                                    value={formData.code}
                                    onChange={handleInputChange}
                                    className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                    required
                                    maxLength="6"
                                    pattern="\d{6}"
                                    placeholder="Ingresa el código de 6 dígitos"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                        >
                            {loading ? 'Verificando...' : 'Verificar código'}
                        </button>

                        <button
                            type="button"
                            onClick={() => setCurrentStep(STEPS.EMAIL)}
                            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                        >
                            Volver
                        </button>
                    </form>
                )

            case STEPS.PASSWORD:
                return (
                    <form onSubmit={handleSubmitPassword} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Nueva Contraseña*
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <KeyIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                    required
                                    minLength="8"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">
                                Repetir Contraseña*
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <KeyIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    name="passwordConfirm"
                                    id="passwordConfirm"
                                    value={formData.passwordConfirm}
                                    onChange={handleInputChange}
                                    className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                    required
                                    minLength="8"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                        >
                            {loading ? 'Cambiando contraseña...' : 'Cambiar Contraseña'}
                        </button>
                    </form>
                )
        }
    }

    const getStepTitle = () => {
        switch (currentStep) {
            case STEPS.EMAIL:
                return 'Recuperar Contraseña'
            case STEPS.CODE:
                return 'Introduce el código de recuperación'
            case STEPS.PASSWORD:
                return 'Cambiar Contraseña'
        }
    }

    const getStepDescription = () => {
        switch (currentStep) {
            case STEPS.EMAIL:
                return 'Introduce el email asociado a tu cuenta y te enviaremos un enlace para que puedas cambiar tu contraseña.'
            case STEPS.CODE:
                return 'Por favor, introduce el código de verificación que hemos enviado al correo electrónico asociado a tu cuenta para continuar con la recuperación de tu contraseña.'
            case STEPS.PASSWORD:
                return 'Introduce tu nueva contraseña para completar el proceso de recuperación.'
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link to="/" className="flex justify-center mb-6">
                    <img className="w-8 h-8" src={favicon} alt="Think & Job" />
                    <p className='text-teal-950 font-semibold text-2xl ml-2'> Think & Job </p>
                </Link>
                <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">
                    {getStepTitle()}
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    {getStepDescription()}
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-sm text-red-600 rounded-md p-4">
                            {error}
                        </div>
                    )}

                    {renderStep()}

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    {currentStep === STEPS.EMAIL ? '¿Recordaste tu contraseña?' : '¿Necesitas ayuda?'}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <Link
                                to={currentStep === STEPS.EMAIL ? '/login' : '#'}
                                onClick={currentStep !== STEPS.EMAIL ? () => setCurrentStep(STEPS.EMAIL) : undefined}
                                className="font-medium text-amber-600 hover:text-amber-500"
                            >
                                {currentStep === STEPS.EMAIL ? 'Iniciar sesión' : 'Volver al inicio'}
                            </Link>
                        </div>
                    </div>
                </div>

                <p className="mt-4 text-center text-xs text-gray-500">
                    *Los campos marcados con un asterisco son obligatorios
                </p>
            </div>
        </div>
    )
}

export default RecuperarPassword