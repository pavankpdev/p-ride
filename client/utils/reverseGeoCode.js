import axios from "../config/axios";

export const reverseGeoCode = async (coords) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `/map/geocode/${coords}`,
    });

    return data;
  } catch (error) {
    throw error;
  }
};
