import React, {useContext, useEffect, useState} from "react";
import useSocket from "../hooks/useSocket";
import {useRouter} from "next/router";
import {UserContext} from "./user";
import axiosInstance from "../config/axios";

export const RideContext = React.createContext({
    rideDetails: {},
    cancelRidecancelRide: () => {}
});

export const RideContextProvider = ({ children }) => {
    const [rideDetails, setRideDetails] = useState({})

    const {socket} = useSocket()
    const router = useRouter();

    const {user, getUser} = useContext(UserContext)

    useEffect(() => {
        socket.on('ACCEPT_RIDE', (data) => {
            setRideDetails(data)
            router.push(`/ride`)
        })

        return () => {
            socket.off('ACCEPT_RIDE', (data) => {
                setRideDetails(data)
                router.push(`/ride`)
            })
        }
    }, [socket])

    const cancelRide = async () => {
       const {data} = await axiosInstance({
            method: 'POST',
            url: `/ride/cancel-ride/${rideDetails?.rideId}`
        })

        console.log({cancelStatusFromAPI: data})
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
