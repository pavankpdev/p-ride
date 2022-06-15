import { Loader } from "@googlemaps/js-api-loader";
import { Box } from "@chakra-ui/react";
import React, {useContext, useMemo} from "react";

// CONTEXT
// import { LocationContext } from "../../context/location";

const Map: React.FC = () => {
    // const { currentLocation, pickUpLocation, dropLocation } =
    //     useContext(LocationContext);

    const loader = useMemo(() => new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
        version: "weekly",
        libraries: ["places"]
    }), [])

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


            })
        }, 2000);

        return () => {
            clearTimeout(debounceHandler);
        };


    }, [loader]);

    return <Box id="map" h={"100%"} w={"100%"} />;
};

export default Map;
