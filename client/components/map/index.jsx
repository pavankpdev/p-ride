import { Loader } from "@googlemaps/js-api-loader";
import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";

// CONTEXT
import { LocationContext } from "../../context/location";

const Map = () => {
  const { currentLocation, pickUpLocation, dropLocation } =
    useContext(LocationContext);

  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    version: "weekly",
  });

  React.useEffect(() => {
    loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: currentLocation.geometry.lat || 12.9736067,
          lng: currentLocation.geometry.lng || 77.5517457,
        },
        zoom: 15,
      });

      new google.maps.Marker({
        position: {
          lat: pickUpLocation.geometry.lat || 12.9736067,
          lng: pickUpLocation.geometry.lng || 77.5517457,
        },
        map: map,
      });

      new google.maps.Marker({
        position: {
          lat: dropLocation.geometry.lat || 12.9736067,
          lng: dropLocation.geometry.lng || 77.5517457,
        },
        map: map,
      });
    });
  }, [loader, currentLocation, pickUpLocation, dropLocation]);

  return <Box id="map" h={"100vh"} w={"100vw"} />;
};

export default Map;
