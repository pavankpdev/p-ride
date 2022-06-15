import React, {useEffect, useState} from "react";
import useSocket from "../hooks/useSocket";
import {useRouter} from "next/router";

export const RideContext = React.createContext({
    rideDetails: {},
    cancelRide: () => {}
});

export const RideContextProvider = ({ children }) => {
    const [rideDetails, setRideDetails] = useState({})

    const {socket} = useSocket()
    const router = useRouter();

    useEffect(() => {
        socket.on('ACCEPT_RIDE', (data) => {
            if(data?.customerSocketId == 123) {
                setRideDetails(data)
                router.push(`/ride`)
            }
        })

        return () => {
            socket.off('ACCEPT_RIDE', (data) => {
                if(data?.customerSocketId == 123) {
                    setRideDetails(data)
                    router.push(`/ride`)
                }
            })
        }
    }, [socket])

    const cancelRide = () => {
        socket.emit('USER_CANCEL_RIDE')
        return true
    }

    return (
        <RideContext.Provider
            value={{
                rideDetails,
                cancelRide
            }}
        >
            {children}
        </RideContext.Provider>
    );
};
