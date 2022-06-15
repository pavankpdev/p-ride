import { Loader } from "@googlemaps/js-api-loader";
import { Box } from "@chakra-ui/react";
import React, {useContext, useMemo} from "react";
import {useRouter} from "next/router";
import {LocationContext} from "context/Location";

const Map: React.FC<{isRideStarted: boolean}> = ({isRideStarted}) => {

    const loader = useMemo(() => new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
        version: "weekly",
        libraries: ["places"]
    }), [])

    const router = useRouter();

    const {getRideDetails, currentLocation} = useContext(LocationContext)

    React.useEffect(() => {
        loader.load().then(async () => {

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
            if(!router?.query?.id) return

            const ride = getRideDetails(router.query?.id as string);

            if(!ride) return

            let origin = currentLocation.geometry
            let destination = ride?.from?.geometry

            if(isRideStarted){
                origin = ride?.from?.geometry;
                destination = ride?.to?.geometry;
            }

            console.log(origin, destination)

            directionsService
                .route({
                    origin,
                    destination,
                    travelMode: google.maps.TravelMode.DRIVING,
                })
                .then((resp) => directionsRenderer.setDirections(resp))
                .catch((err) => console.log(err))


        })
    }, [loader, router, isRideStarted, currentLocation]);

    return <Box id="map" h={"100%"} w={"100%"} />;
};

export default Map;
