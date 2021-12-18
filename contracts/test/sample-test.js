const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const PRIToken = await hre.ethers.getContractFactory("PRIToken");
    const token = await PRIToken.deploy();

    await token.deployed();

    expect(await token.greet()).to.equal("Hello, world!");

    const setTokenTx = await token.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setTokenTx.wait();

    expect(await token.greet()).to.equal("Hola, mundo!");
  });
});
