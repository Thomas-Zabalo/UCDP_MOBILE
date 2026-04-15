// src/app/providers/SocketProvider.tsx
import React, { useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { SocketContext } from './SocketContext';

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('hasToken');

        // URL de ton backend
        const newSocket = io("http://localhost:3000", {
            auth: { token }
        });

        newSocket.on('connect', () => setIsConnected(true));
        newSocket.on('disconnect', () => setIsConnected(false));

        setSocket(newSocket);

        return () => {

            newSocket.close();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);