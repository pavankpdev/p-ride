import { Loader } from "@googlemaps/js-api-loader";
import { Box } from "@chakra-ui/react";
import React, {useMemo} from "react";

const Map: React.FC = () => {

    const loader = useMemo(() => new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
        version: "weekly",
        libraries: ["places"]
    }), [])

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

                const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                    center: {
                        lat: 12.9736067,
                        lng: 77.5517457,
                    },
                    zoom: 15,
                });

                directionsRenderer.setMap(map);

                directionsService
                    .route({
                        origin: {
                            lat: 12.9736067,
                            lng: 77.5517457,
                        },
                        destination: {
                            lat: 12.9937424511023,
                            lng: 77.55007230164148,
                        },
                        travelMode: google.maps.TravelMode.DRIVING,
                    })
                    .then((resp) => directionsRenderer.setDirections(resp))
                    .catch((err) => console.log(err))

            })
        }, 2000);

        return () => {
            clearTimeout(debounceHandler);
        };


    }, [loader]);

    return <Box id="map" h={"100%"} w={"100%"} />;
};

export default Map;
