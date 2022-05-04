// SERVICES
import { Map } from "../../services/maps.js";

export const search = async (req, res) => {
  if (!req.params.query) {
    return res
      .status(500)
      .json({ error: "Please provide an address to search." });
  }
  try {
    const place = await Map.searchPlace(req.params.query);
    if (!place.candidates.length) {
      return res.status(404).json({
        error: `No information found.`,
      });
    }
    const coordinates = place.candidates[0].geometry.location;

    return res.status(200).json({
      place: place.candidates[0],
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Internal server error" });
  }
};
