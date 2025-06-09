import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

export const TestResult = ({ score, totalQuestions, passed, onClose, onRetry }) => {
    const percentage = Math.round((score / totalQuestions) * 100)
    
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div className="relative transform overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-teal-100 to-teal-50">
                            {passed ? (
                                <CheckCircleIcon className="h-16 w-16 text-teal-600" />
                            ) : (
                                <XCircleIcon className="h-16 w-16 text-red-600" />
                            )}
                        </div>
                        <div className="mt-6">
                            <h3 className="text-2xl font-semibold text-gray-900">
                                {passed ? '¡Felicidades!' : 'Inténtalo de nuevo'}
                            </h3>
                            <div className="mt-2">
                                <p className="text-lg text-gray-700">
                                    Has obtenido un {percentage}% de aciertos
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {score} respuestas correctas de {totalQuestions}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        {passed ? (
                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 sm:w-auto"
                            >
                                Continuar
                            </button>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={onRetry}
                                    className="inline-flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 sm:ml-3 sm:w-auto"
                                >
                                    Intentar de nuevo
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Volver
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}