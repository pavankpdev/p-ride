import { expect } from "../chai-setup";
import { setupRide } from "./fixtures";
import { getDefaultRideData } from "./defaults";
import {BigNumber} from "ethers";
import {USERSStruct, STATUSStruct, RIDEDETAILSStruct, RIDEStructOutput} from "../../src/types/Ride";
import {processRideObj} from "./utils";

type DefaultRide = {
  user: USERSStruct;
  status: STATUSStruct;
  rideDetails: RIDEDETAILSStruct;
  timestamp: string
}

describe("Ride.sol", async () => {

  it("Should be able to confirm new ride", async () => {
    const { confirmRide, getRide, getRideCount } = await setupRide();
    const {user, status, rideDetails, timestamp}: DefaultRide = await getDefaultRideData();
    await confirmRide(user, status, rideDetails, timestamp);
    const rideCount = BigNumber.from(await getRideCount()).toNumber();
    const currentRide: RIDEStructOutput = await getRide(rideCount);
    const rideObj = processRideObj(currentRide);

    expect(rideObj.user).to.deep.include(user);
    expect(rideObj.status).to.deep.include(status);
    expect(rideObj.ride).to.deep.include(rideDetails);
    expect(rideObj.timestamp).to.deep.include(timestamp);
  });


  it("Should be able to cancel a ride", async () => {
    const { getRide, cancelRide } = await setupRide();
    await cancelRide(0, 0, new Date().toISOString());
    const currentRide: RIDEStructOutput = await getRide(0);
    const rideObj = processRideObj(currentRide);

    expect(rideObj.status.isCancelled).to.be.equal(true);
    expect(rideObj.status.isComplete).to.be.equal(false);
  });

  it("Should be able to complete a ride", async () => {
    const { getRide, cancelRide , completeRide} = await setupRide();
    await completeRide(0, new Date().toISOString());
    const currentRide: RIDEStructOutput = await getRide(0);
    const rideObj = processRideObj(currentRide);

    expect(rideObj.status.isCancelled).to.be.equal(false);
    expect(rideObj.status.isComplete).to.be.equal(true);
  });

});
