import axios from "../config/axios";

export const getPlaceDetails = async (searchString) => {
  try {
    console.log(searchString);
    const { data } = await axios({
      method: "GET",
      url: "/map/search",
      data: {
        askf: "asfasf",
      },
    });

    console.log({ data });

    return data;
  } catch (error) {
    throw error;
  }
};
