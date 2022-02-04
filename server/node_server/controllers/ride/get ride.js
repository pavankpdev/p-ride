import Rides from "../../database/ride.js";

export const getride = async (req, res) => {
 try{
 const userId = req.body.userId;
 const rides = await Rides.find({customer:userId})

 if(!rides) {
    return res.status(200).json({error: "ride history is empty"});
  }

  return res.status(200).json({ rides});
}
catch(error){
    console.log({error});
    return res.status(500).json({error: "Internal server error"});
}
}
