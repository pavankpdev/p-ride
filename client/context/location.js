import React, {useState} from "react";

// UTILS
import { getCurrentLocation } from "../utils/getCurrentLocation";
import { getPlaceDetails } from "../utils/getPlaceDetails";

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
  distance: 0
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
    setPickUpLocation({
      geometry: location?.geometry,
      formattedAddress: location?.formatted_address || "",
    });
  };

  const updateDropLocation = async (location, isCurrent) => {
    if(isCurrent) {
      setDropLocation(currentLocation);
    }
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

  return (
    <LocationContext.Provider
      value={{
        pickUpLocation,
        dropLocation,
        currentLocation,
        distance,
        updateDropLocation,
        updatePickUpLocation,
        updateDistance,
        updateCurrentLocation
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
