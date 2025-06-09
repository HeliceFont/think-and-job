import { 
    Disclosure, 
    DisclosurePanel, 
    DisclosureButton, 
    Menu, 
    MenuButton, 
    MenuItem, 
    MenuItems 
} from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'
import favicon from '@/assets/logo3B.svg'
import { Outlet } from 'react-router-dom'
import { ColaboradorSidebar } from './ColaboradorSidebar'

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const navigation = [
    { name: 'Formación', href: '/colaborador/formacion', current: false },
    { name: 'PRL', href: '/colaborador/prl', current: false },
    { name: 'Documentación', href: '/colaborador/documentacion', current: false },
    { name: 'Incidencias', href: '/colaborador/incidencias', current: false },
    { name: 'Horarios', href: '/colaborador/horarios', current: false },
    { name: 'Perfil', href: '/colaborador/perfil', current: false },
]

const userNavigation = [
    { name: 'Tu perfil', href: '/colaborador/perfil' },
    { name: 'Ajustes', href: '/colaborador/ajustes' },
    { name: 'Salir', href: '/login' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const ColaboradorDashboard = () => {
    return (
        <>
            <div className="min-h-full sticky">
                <Disclosure as="nav" className="bg-teal-900 block fixed w-full dark:bg-gray-900">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-28 items-center justify-between backdrop-blur-m">
                            <div className="flex items-center">
                                <div className="shrink-0">
                                    <img
                                        alt="Your Company"
                                        src={favicon}
                                        className="size-30 mb-3.5"
                                    />
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                aria-current={item.current ? 'page' : undefined}
                                                className={classNames(
                                                    item.current ? 'bg-amber-400 text-teal-950' : 'text-gray-300 hover:bg-amber-400 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium',
                                                )}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">
                                    <button
                                        type="button"
                                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-amber-400 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Ver notificaciones</span>
                                        <BellIcon aria-hidden="true" className="size-6" />
                                    </button>

                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <MenuButton className="relative flex items-center gap-3 px-4 py-2 rounded-full bg-gray-800/70 backdrop-blur-sm hover:bg-gray-700 transition-colors">
                                                <img
                                                    alt=""
                                                    src={user.imageUrl}
                                                    className="h-8 w-8 rounded-full border-2 border-amber-400"
                                                />
                                                <div className="text-left hidden md:block">
                                                    <h3 className="text-sm font-medium text-white">{user.name}</h3>
                                                    <p className="text-xs text-gray-300">{user.email}</p>
                                                </div>
                                            </MenuButton>
                                        </div>
                                        <MenuItems
                                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                                        >
                                            {userNavigation.map((item) => (
                                                <MenuItem key={item.name}>
                                                    {({ active }) => (
                                                        <a
                                                            href={item.href}
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                        >
                                                            {item.name}
                                                        </a>
                                                    )}
                                                </MenuItem>
                                            ))}
                                        </MenuItems>
                                    </Menu>
                                </div>
                            </div>

                            <div className="-mr-2 flex md:hidden">
                                <Menu as="div" className="relative">
                                    <div>
                                        <MenuButton className="relative flex items-center mr-16 gap-2 px-2.5 py-1.5 rounded-full bg-gray-800/70 backdrop-blur-sm hover:bg-gray-700 transition-colors">
                                            <img
                                                alt=""
                                                src={user.imageUrl}
                                                className="h-7 w-7 rounded-full border-2 border-amber-400"
                                            />
                                            <div className="text-left">
                                                <h3 className="text-xs font-medium text-white">{user.name}</h3>
                                                <p className="text-xs text-gray-300">{user.email}</p>
                                            </div>
                                        </MenuButton>
                                    </div>
                                    <MenuItems
                                        className="absolute right-0 mr-12 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                                    >
                                        {userNavigation.map((item) => (
                                            <MenuItem key={item.name}>
                                                {({ active }) => (
                                                    <a
                                                        href={item.href}
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700'
                                                        )}
                                                    >
                                                        {item.name}
                                                    </a>
                                                )}
                                            </MenuItem>
                                        ))}
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="md:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                            {navigation.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>
                    </DisclosurePanel>
                </Disclosure>

                <main>
                    <ColaboradorSidebar />
                    <Outlet />
                </main>
            </div>
        </>
    )
}