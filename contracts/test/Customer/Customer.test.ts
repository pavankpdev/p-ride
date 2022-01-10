import { ethers } from 'hardhat';
import { expect } from '../chai-setup';
import { BigNumber } from "ethers";
import { setupDriver } from './fixtures';

describe("Driver.sol", async () => {
    const defaultDriver = {name: "Pavan", age: 21};

    it("Should be able to create and retrieve new driver with given wallet address", async () => {
        const { createDriver, users, getDriver } = await setupDriver();

        await createDriver(users[0].address, defaultDriver);
        const [name, age] = await getDriver(users[0].address);
        const driverAge = BigNumber.from(age);

        expect(name).to.be.equal(defaultDriver.name);
        expect(driverAge).to.be.equal(defaultDriver.age);
    });




})