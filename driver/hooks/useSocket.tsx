import { Manager } from "socket.io-client";
import {useEffect, useMemo, useState} from "react";

const useSocket = () => {
    const [socketId, setSocketId] = useState('')

    const manager = useMemo(() => new Manager("http://localhost:3003"), [])
    const socket = useMemo(() => manager.socket("/"), [manager])

    useEffect(() => {
        socket.on('connect', () => setSocketId(socket.id))
    }, [socket])

    return {socketId, socket}
}

export default useSocket;