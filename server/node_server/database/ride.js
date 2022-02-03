import mongoose from "mongoose";
const Schema = new mongoose.Schema({
   Pickup:{
       type: String,
       required: true
   },
   Destination: {
        type: String,
        required: true,
    },
    Customer: {
        type: String,
        required: true
    },
    Driver: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}
);
const Ride = mongoose.model("Ride", Schema);
export default Ride;
