import { useState } from 'react'
import { ClockIcon, PlayIcon, StopIcon } from '@heroicons/react/24/outline'
import { formatTime } from '../../utils/timeUtils'
import { useWorkTime } from '../../context/WorkTimeContext'

export const TimeTracker = () => {
    const [showConfirm, setShowConfirm] = useState(false)
    
    const {
        isWorking,
        timeLeft,
        startTime,
        isExtraTime,
        startWork,
        endWork,
        askForExtraTime
    } = useWorkTime()

    const handleAction = () => {
        if (isWorking) {
            endWork()
        } else {
            startWork()
        }
    }

    return (
        <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 bg-teal-100 rounded-lg p-3">
                        <ClockIcon className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Control de Jornada</h3>
                        <p className="text-sm text-gray-500">
                            {isWorking ? 'Jornada en curso' : 'No has iniciado tu jornada'}
                        </p>
                    </div>
                </div>
                {isWorking && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isExtraTime ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'
                    }`}>
                        {isExtraTime ? 'Horas Extra' : 'Jornada Normal'}
                    </span>
                )}
            </div>

            <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-gray-900 font-mono">
                    {formatTime(timeLeft)}
                </div>
                <button
                    onClick={handleAction}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                        isWorking
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                    }`}
                >
                    {isWorking ? (
                        <>
                            <StopIcon className="h-5 w-5" />
                            <span>Finalizar Jornada</span>
                        </>
                    ) : (
                        <>
                            <PlayIcon className="h-5 w-5" />
                            <span>Iniciar Jornada</span>
                        </>
                    )}
                </button>
            </div>

            {isWorking && startTime && (
                <div className="mt-4 text-sm text-gray-500">
                    Inicio: {new Date(startTime).toLocaleTimeString()}
                </div>
            )}
        </div>
    )
}