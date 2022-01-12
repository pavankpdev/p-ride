import { expect } from "../chai-setup";
import { setupDriver } from "./fixtures";
import { driverDefault, updateDriverDefaults } from "./defaults";

describe("Driver.sol", async () => {
  it("Should be able to create and retrieve new driver with given wallet address", async () => {
    const { createDriver, users, getDriver } = await setupDriver();
    await createDriver(users[0].address, driverDefault);
    const driver = await getDriver(users[0].address);

    expect(driver.fullname).to.be.equal(driverDefault.fullname);
    expect(driver.email).to.be.equal(driverDefault.email);
    expect(driver.dob).to.be.equal(driverDefault.dob);
    expect(driver.picture).to.be.equal(driverDefault.picture);
    expect(driver.govtID).to.be.equal(driverDefault.govtID);
    expect(driver.wallet).to.be.equal(driverDefault.wallet);
    expect(driver.driverAddress).to.be.equal(driverDefault.driverAddress);
    expect(driver.DL).to.be.equal(driverDefault.DL);
  });

  it("Should be able to update and retrieve the driver with given wallet address", async () => {
    const { updateDriver, users, getDriver } = await setupDriver();
    await updateDriver(users[0].address, updateDriverDefaults);
    const driver = await getDriver(users[0].address);

    expect(driver.fullname).to.be.equal(updateDriverDefaults.fullname);
    expect(driver.email).to.be.equal(updateDriverDefaults.email);
    expect(driver.dob).to.be.equal(updateDriverDefaults.dob);
    expect(driver.picture).to.be.equal(updateDriverDefaults.picture);
    expect(driver.govtID).to.be.equal(updateDriverDefaults.govtID);
    expect(driver.wallet).to.be.equal(updateDriverDefaults.wallet);
    expect(driver.driverAddress).to.be.equal(updateDriverDefaults.driverAddress);
    expect(driver.DL).to.be.equal(updateDriverDefaults.DL);
  });
});
