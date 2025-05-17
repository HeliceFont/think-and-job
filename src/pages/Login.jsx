import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import favicon from '../assets/logo.svg' // Asegúrate de importar tu logo

const Login = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
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

            switch (response.user.role) {
                case 'admin':
                    navigate('/admin')
                    break
                case 'manager':
                    navigate('/manager')
                    break
                case 'employee':
                    navigate('/employee')
                    break
                default:
                    navigate('/')
            }
        } catch (err) {
            console.error('Error:', err)
            setError(err.message)
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src={favicon} alt="logo" />
                    Think & Job
                </Link>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
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
                                <a href="#" className="text-sm font-medium text-amber-600 hover:underline dark:text-amber-500">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
                            >
                                Iniciar sesión
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                ¿Aún no tienes cuenta?{' '}
                                <Link to="/register" className="font-medium text-amber-600 hover:underline dark:text-amber-500">
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
