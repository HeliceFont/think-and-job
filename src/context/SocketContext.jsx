import { createContext, useContext, useEffect } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
    const socket = io(import.meta.env.VITE_API_URL, {
        autoConnect: true,
        withCredentials: true
    })

    useEffect(() => {
        return () => {
            if (socket) socket.disconnect()
        }
    }, [])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    const context = useContext(SocketContext)
    if (!context) {
        throw new Error('useSocket debe usarse dentro de SocketProvider')
    }
    return context
}