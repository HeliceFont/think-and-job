import React from 'react'
import logo from '@/assets/logo3B.svg'

export const Footer = () => {
    return (
        <div>


            <footer className="bg-teal-900 rounded-lg shadow-sm dark:bg-gray-900 pt-0 mt-0 ml-4 mr-4 ">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <a href="https://thinkandjob.helicexworkweb.es/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <img src={logo} className="h-8" alt="Flowbite Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
                        </a>
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 dark:text-gray-400">
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">About</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span className="block text-sm text-white sm:text-center dark:text-gray-400">© 2023 <a href="#" className="hover:underline">Tink&Job™</a>. All Rights Reserved.</span>
                </div>
            </footer>

        </div>
    )
}
