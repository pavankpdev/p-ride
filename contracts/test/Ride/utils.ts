import {RIDEStructOutput, USERSStruct, STATUSStruct, RIDEDETAILSStruct} from "../../src/types/Ride";
import {VEHICLEINFOStruct} from "../../src/types/Ride";
import {BigNumber} from "ethers";

export const processRideObj = (ride: RIDEStructOutput) => {
    const rideDetails: RIDEDETAILSStruct = {
        pickup: ride.ride.pickup,
        destination: ride.ride.destination,
        distance: BigNumber.from(ride.ride.distance).toNumber(),
        price: BigNumber.from(ride.ride.price).toNumber(),
    }

    const {driver, customer}: USERSStruct = ride.users;
    const {isCancelled, isConfirmed, isComplete, wasCancelledBy}: STATUSStruct = ride.status;
    const {vehicleImages, vehicleType, vehicle_no, RC}: VEHICLEINFOStruct = ride.vehicle;

    return {
        user: {driver, customer},
        status: {isCancelled, isConfirmed, isComplete, wasCancelledBy},
        ride: rideDetails,
        vehicle: {vehicleImages, vehicleType, vehicle_no, RC},
        timestamp: ride.timestamp
    }
}