import { Loader } from "@googlemaps/js-api-loader";
import { Box } from "@chakra-ui/react";
import React, {useContext, useMemo} from "react";
import {useRouter} from "next/router";
import {LocationContext} from "context/Location";

const Map: React.FC = () => {

    const loader = useMemo(() => new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
        version: "weekly",
        libraries: ["places"]
    }), [])

    const router = useRouter();

    const {getRideDetails, currentLocation} = useContext(LocationContext)

    React.useEffect(() => {
        const debounceHandler = setTimeout(() => {
            loader.load().then(() => {

                const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                    center: {
                        lat: 12.9736067,
                        lng: 77.5517457,
                    },
                    zoom: 15,
                });

                const directionsService = new google.maps.DirectionsService();
                const directionsRenderer = new google.maps.DirectionsRenderer();

                directionsRenderer.setOptions({
                    polylineOptions: {
                        strokeColor: '#000ce6'
                    }
                });

                directionsRenderer.setMap(map);
                if(router.query?.id) {
                    const ride = getRideDetails(router.query?.id as string);

                    if(!ride) return

                    directionsService
                        .route({
                            origin: {
                                lat: currentLocation?.geometry?.lat || 0,
                                lng: currentLocation?.geometry?.lng || 0,
                            },
                            destination: {
                                lat: ride?.from?.geometry?.lat || 0,
                                lng: ride?.from?.geometry?.lng || 0,
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


    }, [loader, router]);

    return <Box id="map" h={"100%"} w={"100%"} />;
};

export default Map;
