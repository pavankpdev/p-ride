import { Loader } from "@googlemaps/js-api-loader";
import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";

// CONTEXT
import { LocationContext } from "../../context/location";

const Map = ({h,w}) => {
  const { currentLocation, pickUpLocation, dropLocation } =
    useContext(LocationContext);

  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    version: "weekly",
    libraries: ["places"]
  });

  React.useEffect(() => {
      const debounceHandler = setTimeout(() => {
          loader.load().then(() => {
              const directionsService = new google.maps.DirectionsService();
              const directionsRenderer = new google.maps.DirectionsRenderer();

              directionsRenderer.setOptions({
                  polylineOptions: {
                      strokeColor: '#000ce6'
                  }
              });

              const map = new google.maps.Map(document.getElementById("map"), {
                  center: {
                      lat: currentLocation.geometry.lat || 12.9736067,
                      lng: currentLocation.geometry.lng || 77.5517457,
                  },
                  zoom: 15,
              });

              directionsRenderer.setMap(map);

              if(pickUpLocation?.geometry?.lat && dropLocation?.geometry?.lng){
                  directionsService
                      .route({
                          origin: {
                              lat: pickUpLocation?.geometry?.lat || 0,
                              lng: pickUpLocation?.geometry?.lng || 0,
                          },
                          destination: {
                              lat: dropLocation?.geometry?.lat || 0,
                              lng: dropLocation?.geometry?.lng || 0,
                          },
                          travelMode: google.maps.TravelMode.DRIVING,
                      })
                      .then((resp) => directionsRenderer.setDirections(resp))
                      .catch((err) => console.log(err))
              }
          })
      }, 2000);

      return () => {
        clearTimeout(debounceHandler);
      };


  }, [loader, currentLocation, pickUpLocation, dropLocation]);

  return <Box id="map" h={ h || "100vh"} w={ w ||"100vw"} />;
};

export default Map;
