import React, {ReactNode, useContext, useState} from "react";

// UTILS
import { getCurrentLocation } from "utils/getCurrentLocation";

// HOOKS
import useSocket from "hooks/useSocket";
import {DriverContext} from "context/driver";
import axiosInstance from "configs/axios";

type Geometry = {
    lat: number,
    lng: number,
}

interface ILocation {
    formatted_address: string;
    geometry: Geometry;
}

export interface IRideRequest {
    rideId?: string;
    from: ILocation;
    to: ILocation;
    carType: 'SUV' | 'Sedan' | 'Mini';
    price: number;
    distance: number;
    userId: string;
    otp: number;
    fullname: string;
    phno: string
    isAccepted?: boolean
    address: string
}

export const LocationContext = React.createContext({
    currentLocation: {
        formattedAddress: "",
        geometry: {
            lat: 0,
            lng: 0,
        },
    },
    dropLocation: {
        formattedAddress: "",
        geometry: {
            lat: 0,
            lng: 0,
        },
    },
    pickUpLocation: {
        formattedAddress: "",
        geometry: {
            lat: 0,
            lng: 0,
        },
    },
    updatePickUpLocation: (location: ILocation, isCurrent: boolean) => {},
    updateDropLocation: (location: ILocation, isCurrent: boolean) => {},
    distance: 0,
    duration: 0,
    updateDistance: (distance: number) => {},
    updateDuration: (duration: number) => {},
    updateCurrentLocation: (place: string) => {},
    passRide: (socketId: string) => {},
    acceptRide: (params: IRideRequest): boolean => false,
    getRideDetails: (socketId: string):IRideRequest | null=> null ,
    rideQueue: [] as IRideRequest[],
    rideId: 0
});

export const LocationContextProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [currentLocation, setCurrentLocation] = React.useState({
        formattedAddress: "",
        geometry: {
            lat: 0,
            lng: 0,
        },
    });
    const [pickUpLocation, setPickUpLocation] = React.useState({
        formattedAddress: "",
        geometry: {
            lat: 0,
            lng: 0,
        },
    });
    const [dropLocation, setDropLocation] = React.useState({
        formattedAddress: "",
        geometry: {
            lat: 0,
            lng: 0,
        },
    });
    const [distance, setDistance] = useState(0)
    const [duration, setDuration] = useState(0)
    const [rideQueue, setRideQueue] = useState<IRideRequest[]>([])
    const [acceptedRideId, setAcceptedRideId] = useState<any>('')
    const [rideId, setRideId] = useState(0)

    const {socket} = useSocket();
    const {driver} = useContext(DriverContext)

    React.useEffect(() => {
        if(typeof localStorage !== 'undefined') {
            const data = localStorage.getItem('ride-queue')
            if(data) {
                const queue: IRideRequest[] = JSON.parse(data).queue;
                const state = queue.filter((ride) => !ride.isAccepted)
                setRideQueue(state)
            }
        }
    }, [])

    React.useEffect(() => {
        getCurrentLocation().then((coord) => {
            console.log({coord})
            setCurrentLocation({
                ...currentLocation,
                ...coord
            });
        });
    }, []);

    React.useEffect(() => {
        socket.on('NEW_RIDE_QUEUE', (data: IRideRequest) => {
            if(!rideQueue.some(({userId}) => userId == data.userId)){
                if(acceptedRideId) return
                const state = [...rideQueue, data]
                setRideQueue(state)
                if(typeof localStorage !== 'undefined') {
                    localStorage.setItem('ride-queue', JSON.stringify({queue: state}))
                }
            }
        })
        return () => {
            socket.off('NEW_RIDE_QUEUE', (data: IRideRequest) => {
                if(!rideQueue.some(({userId}) => userId == data.userId)){
                    if(acceptedRideId) return
                    const state = [...rideQueue, data]
                    setRideQueue(state)
                    if(typeof localStorage !== 'undefined') {
                        localStorage.setItem('ride-queue', JSON.stringify({queue: state}))
                    }
                }
            })
        }
    }, [socket])

    const updatePickUpLocation = async (location: ILocation, isCurrent: boolean) => {
        if(isCurrent) {
            setPickUpLocation(currentLocation);
        }
        if(!location?.geometry || !location?.formatted_address) return
        setPickUpLocation({
            geometry: location?.geometry,
            formattedAddress: location?.formatted_address || "",
        });
    };

    const updateDropLocation = async (location: ILocation, isCurrent: boolean) => {
        if(isCurrent) {
            setDropLocation(currentLocation);
        }
        if(!location?.geometry || !location?.formatted_address) return
        setDropLocation({
            geometry: location?.geometry,
            formattedAddress: location?.formatted_address || "",
        });
    };

    const updateCurrentLocation = (place: string) => {
        setCurrentLocation({
            ...currentLocation,
            formattedAddress: place
        })
    }

    const updateDistance = (distance: number) => setDistance(distance)
    const updateDuration = (duration: number) => setDuration(duration)

    const passRide = (userId: string) => {
        const state = rideQueue.filter((ride) => ride.userId !== userId)
        setRideQueue(state)
        if(typeof localStorage !== 'undefined') {
            localStorage.setItem('ride-queue', JSON.stringify({queue: state}))
        }
    }

    const acceptRide = (params: IRideRequest): boolean => {
        const ride = rideQueue.filter((ride) => ride.userId === params.userId)
        if(!ride.length) return false
        setAcceptedRideId(ride[0].userId)

        const payload = {
            driver: driver?.address,
            customer: params.address,
            from: params.from.formatted_address,
            to: params.to.formatted_address,
            carType: 'SUV',
            price: parseInt(`${params.price}`),
            distance: parseInt(`${params.distance}`)
        }

        axiosInstance({
            method: 'POST',
            url: '/ride/confirm-ride',
            data: payload
        })
            .then(({data}) => {

                setRideId(data?.id)

                const acceptRequestPayload = {
                    driver: {
                        fullname: driver?.fullname,
                        location: {
                            formatted_address: currentLocation.formattedAddress,
                            geometry: currentLocation.geometry
                        },
                        driverId: driver?._id,
                        phno: driver?.phno
                    },
                    customerSocketId: params.userId,
                    otp: params.otp,
                    rideId: data?.id
                }

                socket.emit('DRIVER_ACCEPT_RIDE', acceptRequestPayload)
            })

        const state = rideQueue.map((ride) => {
            if(ride.userId == params.userId) {
                return {...ride, isAccepted: true}
            }

            return params.userId
        })

        setRideQueue(state as IRideRequest[])
        if(typeof localStorage !== 'undefined') {
            localStorage.setItem('ride-queue', JSON.stringify({queue: state}))
        }

        return true
    }

    const getRideDetails = (userId: string): IRideRequest => {
        const ride = rideQueue.filter((ride) => ride.userId === userId)
        return ride[0]
    }

    return (
        <LocationContext.Provider
            value={{
                pickUpLocation,
                dropLocation,
                currentLocation,
                distance,
                duration,
                rideQueue,
                rideId,
                updateDropLocation,
                updatePickUpLocation,
                updateDistance,
                updateCurrentLocation,
                updateDuration,
                passRide,
                acceptRide,
                getRideDetails
            }}
        >
            {children}
        </LocationContext.Provider>
    );
};
