import React, {useState} from "react";

// UTILS
import { getCurrentLocation } from "../utils/getCurrentLocation";

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
  updatePickUpLocation: (searchString) => {},
  updateDropLocation: (searchString) => {},
  distance: 0,
  duration: 0,
  updateDistance: (distance) => {},
  updateDuration: (duration) => {}
});

export const LocationContextProvider = ({ children }) => {
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

  React.useEffect(() => {
    getCurrentLocation().then((coord) => {
      setCurrentLocation(coord);
      setPickUpLocation(coord);
    });
  }, []);

  const updatePickUpLocation = async (location, isCurrent) => {
    if(isCurrent) {
      setPickUpLocation(currentLocation);
    }
    if(!location?.geometry || !location?.formatted_address) return
    setPickUpLocation({
      geometry: location?.geometry,
      formattedAddress: location?.formatted_address || "",
    });
  };

  const updateDropLocation = async (location, isCurrent) => {
    if(isCurrent) {
      setDropLocation(currentLocation);
    }
    if(!location?.geometry || !location?.formatted_address) return
      setDropLocation({
        geometry: location?.geometry,
        formattedAddress: location?.formatted_address || "",
      });
  };

  const updateCurrentLocation = (place) => {
    setCurrentLocation({
      ...currentLocation,
      formattedAddress: place
    })
  }

  const updateDistance = (distance) => setDistance(distance)
  const updateDuration = (duration) => setDuration(duration)

  return (
    <LocationContext.Provider
      value={{
        pickUpLocation,
        dropLocation,
        currentLocation,
        distance,
        duration,
        updateDropLocation,
        updatePickUpLocation,
        updateDistance,
        updateCurrentLocation,
        updateDuration
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
