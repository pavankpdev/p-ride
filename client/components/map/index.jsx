import { Loader } from "@googlemaps/js-api-loader";
import { Box } from "@chakra-ui/react";
import React from "react";

const Map = () => {
  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    version: "weekly",
  });

  React.useEffect(() => {
    loader.load().then(() => {
      new google.maps.Map(document.getElementById("map"), {
        center: { lat: 12.971698, lng: 77.549264 },
        zoom: 15,
      });
    });
  }, [loader]);

  return <Box id="map" h={"100vh"} w={"100vw"} />;
};

export default Map;
