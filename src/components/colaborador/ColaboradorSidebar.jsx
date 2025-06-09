import { Link } from 'react-router-dom'
import {
    AcademicCapIcon,
    DocumentTextIcon,
    ShieldCheckIcon,
    ExclamationTriangleIcon,
    ClockIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Formación', href: '/colaborador/formacion', icon: AcademicCapIcon },
    { name: 'PRL', href: '/colaborador/prl', icon: ShieldCheckIcon },
    { name: 'Documentación', href: '/colaborador/documentacion', icon: DocumentTextIcon },
    { name: 'Incidencias', href: '/colaborador/incidencias', icon: ExclamationTriangleIcon },
    { name: 'Horarios', href: '/colaborador/horarios', icon: ClockIcon },
    { name: 'Perfil', href: '/colaborador/perfil', icon: UserCircleIcon },
]

export const ColaboradorSidebar = () => {
    return (
        <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 lg:overflow-y-auto lg:bg-gray-900 lg:pb-4 lg:flex lg:flex-col">
            <div className="mt-28">
                <nav className="mt-8">
                    <ul role="list" className="flex flex-col items-center space-y-1">
                        {navigation.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.href}
                                    className="text-gray-400 hover:text-amber-400 hover:bg-gray-800 group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold"
                                >
                                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                    <span className="sr-only">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}