import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { useSocket } from './SocketContext'

const STORAGE_KEY = 'workTime'

const WorkTimeContext = createContext()

export const WorkTimeProvider = ({ children }) => {
    const socket = useSocket()
    const [state, setState] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        const initialState = saved ? JSON.parse(saved) : {
            isWorking: false,
            timeLeft: 8 * 60 * 60,
            startTime: null,
            isExtraTime: false,
            lastUpdate: new Date().toISOString()
        }

        // Si hay una jornada activa, calcular el tiempo transcurrido
        if (initialState.isWorking && initialState.lastUpdate) {
            const now = new Date().getTime()
            const lastUpdate = new Date(initialState.lastUpdate).getTime()
            const timePassed = Math.floor((now - lastUpdate) / 1000)
            
            // Actualizar el tiempo restante
            const updatedTimeLeft = Math.max(0, initialState.timeLeft - timePassed)
            
            return {
                ...initialState,
                timeLeft: updatedTimeLeft,
                lastUpdate: new Date().toISOString()
            }
        }

        return initialState
    })

    // Escuchar actualizaciones de otros dispositivos
    useEffect(() => {
        socket.on('workTime:update', (newState) => {
            setState(newState)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
        })

        return () => {
            socket.off('workTime:update')
        }
    }, [socket])

    // Efecto para sincronizar con localStorage en cada cambio de estado
    useEffect(() => {
        if (state.isWorking) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
        }
    }, [state])

    // Efecto para el contador
    useEffect(() => {
        let intervalId

        if (state.isWorking && state.timeLeft > 0) {
            // Guardamos el estado inmediatamente
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                ...state,
                lastUpdate: new Date().toISOString()
            }))

            intervalId = setInterval(() => {
                setState(prev => {
                    const newTimeLeft = Math.max(0, prev.timeLeft - 1)
                    const newState = {
                        ...prev,
                        timeLeft: newTimeLeft,
                        lastUpdate: new Date().toISOString()
                    }

                    // Actualizamos localStorage en cada tick
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
                    return newState
                })
            }, 1000)
        }

        // Limpieza
        return () => {
            if (intervalId) {
                clearInterval(intervalId)
                // Guardamos el último estado antes de limpiar
                localStorage.setItem(STORAGE_KEY, JSON.stringify({
                    ...state,
                    lastUpdate: new Date().toISOString()
                }))
            }
        }
    }, [state.isWorking]) // Solo dependemos de isWorking

    const updateWorkState = (newState) => {
        setState(newState)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
        // Emitir el cambio a otros dispositivos
        socket.emit('workTime:update', {
            newState,
            userId: user.id // Asegúrate de tener acceso al ID del usuario
        })
    }

    const startWork = useCallback(() => {
        const newState = {
            isWorking: true,
            timeLeft: 8 * 60 * 60,
            startTime: new Date().toISOString(),
            isExtraTime: false
        }
        updateWorkState(newState)
    }, [])

    const endWork = useCallback(() => {
        const newState = {
            isWorking: false,
            timeLeft: 8 * 60 * 60,
            startTime: null,
            isExtraTime: false
        }
        updateWorkState(newState)
        localStorage.removeItem(STORAGE_KEY)
    }, [])

    const handleExtraTimePrompt = useCallback(() => {
        if (window.confirm('¿Deseas comenzar horas extra?')) {
            setState(prev => ({
                ...prev,
                isExtraTime: true,
                timeLeft: 4 * 60 * 60,
                lastUpdate: new Date().toISOString()
            }))
        } else {
            endWork()
        }
    }, [endWork])

    // Memoizamos el valor del contexto
    const contextValue = useMemo(() => ({
        ...state,
        startWork,
        endWork,
        handleExtraTimePrompt
    }), [state, startWork, endWork, handleExtraTimePrompt])

    return (
        <WorkTimeContext.Provider value={contextValue}>
            {children}
        </WorkTimeContext.Provider>
    )
}

export const useWorkTime = () => {
    const context = useContext(WorkTimeContext)
    if (!context) {
        throw new Error('useWorkTime debe usarse dentro de WorkTimeProvider')
    }
    return context
}