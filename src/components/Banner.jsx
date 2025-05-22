import React from 'react'
import { Link } from 'react-router-dom'
import banner from '../assets/banner.png'

export const Banner = () => {
    return (
        <>
        <div className='flex flex-col p-30 mt-24 md:flex-row justify-between items-center  text-black backdrop-blur-md p-4'>
            <div className=''>
                <h1 className='text-'>RRHH 4.0</h1>
                <p>Transformación digital en la gestión de personas</p>
                <p>Think & Job es una plataforma de gestión empresarial que integra todos los procesos de recursos humanos en un solo lugar.</p>

            </div>
            <div>
                <img src={banner} alt="" className=' w-100' />
            </div>

        </div>
        <div className="relative mt-16 min-h-[calc(100vh-4rem)] bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Bienvenido a Think & Job
                    </h1>
                    <p className="mt-3 text-lg text-gray-600">
                        Sistema de gestión empresarial
                    </p>
                    <div className="mt-8">
                        <Link
                            to="/login"
                            className="inline-block bg-amber-400 text-white px-6 py-3 rounded-md font-medium hover:bg-amber-500 hover:text-teal-900 transition duration-200"
                        >
                            Iniciar Sesión
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
