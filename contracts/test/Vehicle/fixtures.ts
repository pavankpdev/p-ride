import {
  ethers,
  deployments,
  getNamedAccounts,
  getUnnamedAccounts,
} from "hardhat";
import { setupUsers, setupUser } from "../utils";
import { Vehicle } from "../../src/types";

export const setupVehicle = deployments.createFixture(async () => {
  // Deployment Setup
  await deployments.fixture("Vehicle");
  const vehicle = (await ethers.getContract("Vehicle")) as Vehicle;
  // Account Setup
  const accounts = await getNamedAccounts();
  const unnamedAccounts = await getUnnamedAccounts();
  const users = await setupUsers(unnamedAccounts, { vehicle });
  const deployer = await setupUser(accounts.admin, { vehicle });
  return { users, deployer, ...vehicle };
});
