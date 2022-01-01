import { ethers } from 'hardhat';
import { expect } from '../chai-setup';
import { BigNumber } from "ethers";
import { setupToken } from './fixtures';

describe("PriToken.sol", async () => {
    it("should have correct name", async () => {
        const { users } = await setupToken();
        const name = await users[0].token.name();
        expect(name).to.be.equal("Pride Token");
    });
    it("should have correct symbol", async () => {
        const { users } = await setupToken();
        const symbol = await users[0].token.symbol();
        expect(symbol).to.be.equal("PRI");
    });
    it("should have correct supply", async () => {
        const { users } = await setupToken();
        const totalSupply = await users[0].token.totalSupply();
        expect(totalSupply).to.be.equal(ethers.utils.parseEther("1000000000"));
    });
    it("beneficiary should have entire supply", async () => {
        const { deployer, token } = await setupToken();
        const totalSupply = await token.totalSupply();
        const beneficiaryBalance = await token.balanceOf(deployer.address);
        expect(beneficiaryBalance).to.be.equal(totalSupply);
    });
    it("holder should be able to transfer", async () => {
        const { users, token, deployer } = await setupToken();
        const from = deployer;
        const to = users[1];
        const fromBalance = BigNumber.from(await token.balanceOf(from.address));
        const toBalance = BigNumber.from(await token.balanceOf(to.address));
        const amount = ethers.utils.parseEther("200");
        await expect(from.token.transfer(to.address, amount)).to.emit(token, "Transfer");
        const fromBalance_new = BigNumber.from(await token.balanceOf(from.address));
        const toBalance_new = BigNumber.from(await token.balanceOf(to.address));
        expect(fromBalance_new).to.be.equal(fromBalance.sub(amount));
        expect(toBalance_new).to.be.equal(toBalance.add(amount));
    });
    it("holder should be able to approve", async () => {
        const { users, token, deployer } = await setupToken();
        const approver = deployer;
        const spender = users[1];
        const amount = ethers.utils.parseEther("200");
        await expect(approver.token.approve(spender.address, amount)).to.emit(token, "Approval");
        const allowance = await approver.token.allowance(approver.address, spender.address);
        expect(allowance).to.be.equal(amount);
    });
    it("approved should be able to transfer", async () => {
        const { users, token, deployer } = await setupToken();
        const approver = deployer;
        const spender = users[1];
        const amount = ethers.utils.parseEther("200");
        const approverBalance = BigNumber.from(await token.balanceOf(approver.address));
        const spenderBalance = BigNumber.from(await token.balanceOf(spender.address));
        await approver.token.approve(spender.address, amount);
        await expect(spender.token.transferFrom(approver.address, spender.address, amount)).to.emit(token, "Transfer");
        const approverBalance_new = BigNumber.from(await token.balanceOf(approver.address));
        const spenderBalance_new = BigNumber.from(await token.balanceOf(spender.address));
        expect(approverBalance_new).to.be.equal(approverBalance.sub(amount));
        expect(spenderBalance_new).to.be.equal(spenderBalance.add(amount));
    });
})