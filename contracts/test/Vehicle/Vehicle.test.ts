import { expect } from "../chai-setup";
import { setupVehicle } from "./fixtures";
import { vehicleDefault, updatedVehicleDefaults } from "./defaults";

describe("Vehicle.sol", async () => {
  it("Should be able to create and retrieve new vehicle with given driver wallet address", async () => {
    const { addVehicle, getVehicle, users } = await setupVehicle();
    await addVehicle(users[0].address, {...vehicleDefault, driver: users[0].address});
    const vehicle = await getVehicle(users[0].address);

    expect(vehicle.driver).to.be.equal(users[0].address);
    expect(vehicle.vehicle_no).to.be.equal(vehicleDefault.vehicle_no);
    expect(vehicle.RC).to.be.equal(vehicleDefault.RC);
    expect(vehicle.vehicleType).to.be.equal(vehicleDefault.vehicleType);
    expect(vehicle.vehicleImages).to.be.equal(vehicleDefault.vehicleImages);
  });

  it("Should be able to update and retrieve the vehicle with given wallet address", async () => {
    const { getVehicle, users, updateVehicle } = await setupVehicle();
    await updateVehicle(users[0].address, {...updatedVehicleDefaults, driver: users[0].address});
    const vehicle = await getVehicle(users[0].address);

    expect(vehicle.driver).to.be.equal(users[0].address);
    expect(vehicle.vehicle_no).to.be.equal(updatedVehicleDefaults.vehicle_no);
    expect(vehicle.RC).to.be.equal(updatedVehicleDefaults.RC);
    expect(vehicle.vehicleType).to.be.equal(updatedVehicleDefaults.vehicleType);
    expect(vehicle.vehicleImages).to.be.equal(updatedVehicleDefaults.vehicleImages);
  });

});
