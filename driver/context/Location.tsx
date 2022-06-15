import React, {ReactNode, useState} from "react";

// UTILS
import { getCurrentLocation } from "utils/getCurrentLocation";

// HOOKS
import useSocket from "hooks/useSocket";

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
    socketId: string;
    otp: number;
    fullname: string;
    phno: string
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
    rideQueue: [] as IRideRequest[]
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

    const {socket} = useSocket();

    React.useEffect(() => {
        getCurrentLocation().then((coord) => {
            setCurrentLocation({
                ...currentLocation,
                ...coord
            });
        });
    }, []);

    React.useEffect(() => {
        socket.on('NEW_RIDE_QUEUE', (data: IRideRequest) => {
            if(!rideQueue.some(({socketId}) => socketId == data.socketId)){
                setRideQueue([...rideQueue, data])
            }
        })
        return () => {
            socket.off('NEW_RIDE_QUEUE', (data: IRideRequest) => {
                if(!rideQueue.some(({socketId}) => socketId == data.socketId)){
                    setRideQueue([...rideQueue, data])
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

    const passRide = (socketId: string) => {
        const state = rideQueue.filter((ride) => ride.socketId !== socketId)
        setRideQueue(state)
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
                updateDropLocation,
                updatePickUpLocation,
                updateDistance,
                updateCurrentLocation,
                updateDuration,
                passRide
            }}
        >
            {children}
        </LocationContext.Provider>
    );
};
