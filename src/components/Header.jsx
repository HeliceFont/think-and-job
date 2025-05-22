import React from 'react'
import { useState } from "react";
import logo1 from '../assets/logo3B.svg'
import GooeyNav from './ui/GooeyNav' // Añade esta línea

// Modifica el array navigation existente
const navigation = [
    { label: "Inicio", href: "#" },
    { label: "Servicios", href: "#companies" },
    { label: "Bolsa", href: "#workers" },
    { label: "Contacto", href: "#contact" },
    { label: "Acceder", href: "/login" },
];

export const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    return (
        <div>
            <nav className="bg-teal-900/75 block fixed w-full z-50 dark:bg-gray-900 backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center h-8">
                            <img
                                className="size-38 shrink-0"
                                src={logo1}
                                alt="Think and Job"
                            />
                        </div>

                        {/* Navigation - Desktop */}
                        <div className="hidden md:block">
                            <GooeyNav
                                items={navigation}
                                particleCount={10}          // Reduce para mejor rendimiento
                                particleDistances={[60, 8]} // Ajusta para un efecto más sutil
                                particleR={80}             // Tamaño más pequeño para el header
                                initialActiveIndex={0}
                                animationTime={500}
                                timeVariance={200}
                                colors={[2, 3, 1, 4]}      // Usa los colores definidos en las variables CSS
                            />
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="inline-flex items-center justify-center rounded-md bg-amber-400 p-2 text-teal-950 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="sr-only">Open main menu</span>
                                {mobileMenuOpen ? (
                                    <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden" id="mobile-menu">
                        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                            {navigation.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className={`block rounded-md px-3 py-2 text-base font-medium ${item.current
                                        ? "bg-gray-900 text-white"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                        }`}
                                    aria-current={item.current ? "page" : undefined}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>

                    </div>
                )}
            </nav>
        </div>
    );
};
