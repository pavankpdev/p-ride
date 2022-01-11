import {
  ethers,
  deployments,
  getNamedAccounts,
  getUnnamedAccounts,
} from "hardhat";
import { setupUsers, setupUser } from "../utils";
import { Customer } from "../../src/types";

export const setupCustomer = deployments.createFixture(async () => {
  // Deployment Setup
  await deployments.fixture("Customer");
  const customer = (await ethers.getContract("Customer")) as Customer;
  // Account Setup
  const accounts = await getNamedAccounts();
  const unnamedAccounts = await getUnnamedAccounts();
  const users = await setupUsers(unnamedAccounts, { customer });
  const deployer = await setupUser(accounts.admin, { customer });
  return { users, deployer, ...customer };
});
