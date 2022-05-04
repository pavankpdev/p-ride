import axios from "axios";

const endPoints = {
  placesAPI:
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
};

const searchPlace = async (searchString) => {
  try {
    const url = new URL(endPoints.placesAPI);
    url.searchParams.set("input", searchString);
    url.searchParams.set("inputtype", "textquery");
    url.searchParams.set("fields", "formatted_address,geometry,name");
    url.searchParams.set("key", process.env.GOOGLE_MAPS_API_KEY);

    const { data } = await axios({
      method: "GET",
      url: url.href,
    });

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const Map = {
  searchPlace,
};
