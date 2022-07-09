import { USERSStruct, STATUSStruct, RIDEDETAILSStruct } from "../../src/types/Ride";
import {setupRide} from "./fixtures";

export const getDefaultRideData = async () => {
    const {users} = await setupRide();
    const user: USERSStruct = {
        customer: users[0].address,
        driver: users[1].address,
    };

    const status: STATUSStruct = {
        isCancelled: false,
        isComplete: false,
        isConfirmed: true,
        wasCancelledBy: 2
    };

    const rideDetails: RIDEDETAILSStruct = {
        pickup: "Bangalore",
        destination: "Bangalore",
        distance: 38,
        price: 300,
    }

    const timestamp: string = new Date().toISOString();

    return {user, status, rideDetails, timestamp};
}