import axios from "../config/axios";

export const getCurrentLocation = async () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  try {
    const { coords } = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
        [options]
      );
    });

    // const address = await axios({
    //   method: "GET",
    //   url: `${process.env.NEXT_PUBLIC_NODE_API_URL}/map/search`,
    // });

    return {
      geometry: {
        lat: coords.latitude,
        lng: coords.longitude,
      },
    };
  } catch (error) {
    throw error;
  }
};
