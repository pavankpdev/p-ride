import {
  ethers,
  deployments,
  getNamedAccounts,
  getUnnamedAccounts,
} from "hardhat";
import { setupUsers, setupUser } from "../utils";
import { Ride } from "../../src/types";

export const setupRide = deployments.createFixture(async () => {
  // Deployment Setup
  await deployments.fixture("Ride");
  const ride = (await ethers.getContract("Ride")) as Ride;
  // Account Setup
  const accounts = await getNamedAccounts();
  const unnamedAccounts = await getUnnamedAccounts();
  const users = await setupUsers(unnamedAccounts, { ride });
  const deployer = await setupUser(accounts.admin, { ride });
  return { users, deployer, ...ride };
});
