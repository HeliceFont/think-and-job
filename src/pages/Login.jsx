import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import favicon from '@/assets/logo.svg' // Asegúrate de importar tu logo

const Login = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [rememberMe, setRememberMe] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await login({ email, password })
            console.log('Login exitoso:', {
                user: response.user,
                token: response.token?.substring(0, 10) + '...'
            })

            // Redirige a la ruta anterior o a la ruta según el rol
            const from = location.state?.from?.pathname || getRoleDefaultPath(response.user.role)
            navigate(from, { replace: true })
            
        } catch (err) {
            console.error('Error:', err)
            setError(err.message)
        }
    }

    const getRoleDefaultPath = (role) => {
        const paths = {
            admin: '/admin',
            encargado: '/encargado',
            colaborador: '/colaborador',
            candidato: '/candidato',
            supermaster: '/supermaster',
            master: '/master'
        }
        return paths[role] || '/'
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900 pt-0 pb-0 sm:pt-0 sm:pb-0 md:pt-10 md:pb-12">
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.32))] px-4 mx-auto">
                <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src={favicon} alt="logo" />
                    Think & Job
                </Link>
                <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 mb-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Inicia sesión en tu cuenta
                        </h1>
                        {error && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {error}
                            </div>
                        )}
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Tu correo
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500"
                                    placeholder="nombre@compañia.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500"
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-amber-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-amber-600 dark:ring-offset-gray-800"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                            Recordarme
                                        </label>
                                    </div>
                                </div>
                                <Link 
                                    to="/recuperar-password" 
                                    className="text-sm font-medium text-amber-500 hover:underline dark:text-amber-500"
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
                            >
                                Iniciar sesión
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                ¿Aún no tienes cuenta?{' '}
                                <Link to="/register" className="font-medium text-amber-500 hover:underline dark:text-amber-500">
                                    Regístrate
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
