import {expect} from "../chai-setup";

import {ethers, deployments, getNamedAccounts} from 'hardhat';

describe("Token contract", function() {
    it("Deployment should assign the total supply of tokens to the owner", async function() {
        await deployments.fixture(["PriToken"]);
        const {admin} = await getNamedAccounts();
        const Token = await ethers.getContract("PriToken");
        const ownerBalance = await Token.balanceOf(admin);
        const supply = await Token.totalSupply();
        expect(ownerBalance).to.equal(supply);
    });
});

