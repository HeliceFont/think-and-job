import React, { useState, useEffect } from 'react'
import logo1 from '../assets/logo3B.svg'
import GooeyNav from './ui/GooeyNav'

const navigation = [
    { label: "Inicio", href: "#" },
    { label: "Servicios", href: "#companies" },
    { label: "Bolsa", href: "#workers" },
    { label: "Contacto", href: "#contact" },
    { label: "Acceder", href: "/login" },
]

export const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // Cerrar menú al hacer clic fuera o con ESC
    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === 'Escape') {
                setMobileMenuOpen(false)
            }
        }

        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
            window.addEventListener('keydown', handleEscKey)
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
            window.removeEventListener('keydown', handleEscKey)
        }
    }, [mobileMenuOpen])

    return (
        <header className="fixed top-0 left-0 right-0 z-40">
            <nav className="bg-teal-900/75 backdrop-blur-md shadow-lg relative z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <img
                                src={logo1}
                                alt="Think and Job"
                                className="h-8 w-auto"
                            />
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            <GooeyNav
                                items={navigation}
                                particleCount={10}
                                particleDistances={[60, 8]}
                                particleR={80}
                                initialActiveIndex={0}
                                animationTime={500}
                                timeVariance={200}
                                colors={[2, 3, 1, 4]}
                            />
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md 
                                           text-teal-950 bg-amber-400 
                                           hover:bg-amber-500 hover:text-white
                                           focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white
                                           transition-colors duration-200"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Abrir menú principal</span>
                                {mobileMenuOpen ? (
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Menú móvil optimizado */}
            {mobileMenuOpen && (
                <>
                    {/* Overlay para cerrar el menú */}
                    <div 
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                        onClick={() => setMobileMenuOpen(false)}
                        aria-hidden="true"
                    />
                    
                    {/* Panel del menú */}
                    <div className="fixed inset-y-0 left-0 w-64 bg-teal-900/95 backdrop-blur-lg shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
                        <div className="p-5">
                            {/* Header del menú con X para cerrar */}
                            <div className="flex items-center justify-between mb-6">
                                <img
                                    src={logo1}
                                    alt="Think and Job"
                                    className="h-8 w-auto"
                                />
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="rounded-full p-2 text-white hover:bg-teal-800/50 transition-colors"
                                    aria-label="Cerrar menú"
                                >
                                    <svg 
                                        className="h-6 w-6" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M6 18L18 6M6 6l12 12" 
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Links de navegación */}
                            <nav className="grid gap-y-4">
                                {navigation.map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className="flex items-center rounded-md px-4 py-2.5
                                                 text-base font-medium text-white
                                                 hover:bg-teal-800/50 active:bg-teal-800/70
                                                 transition-colors duration-200"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>
                </>
            )}
        </header>
    )
}
