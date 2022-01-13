import {
  ethers,
  deployments,
  getNamedAccounts,
  getUnnamedAccounts,
} from "hardhat";
import { setupUsers, setupUser } from "../utils";
import { Driver } from "../../src/types";

export const setupDriver = deployments.createFixture(async () => {
  // Deployment Setup
  await deployments.fixture("Driver");
  const driver = (await ethers.getContract("Driver")) as Driver;
  // Account Setup
  const accounts = await getNamedAccounts();
  const unnamedAccounts = await getUnnamedAccounts();
  const users = await setupUsers(unnamedAccounts, { driver });
  const deployer = await setupUser(accounts.admin, { driver });
  return { users, deployer, ...driver };
});
