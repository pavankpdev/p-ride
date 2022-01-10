import {
    ethers,
    deployments,
    getNamedAccounts,
    getUnnamedAccounts,
} from 'hardhat';
import { setupUsers, setupUser } from '../utils';
import { PriToken } from '../../src/types';
import { AbiCoder } from '@ethersproject/abi';
const abiCoder = new AbiCoder();

export const setupToken = deployments.createFixture(async () => {
    // Deployment Setup
    await deployments.fixture('PriToken');
    const token = await ethers.getContract('PriToken') as PriToken;
    // Account Setup
    const accounts = await getNamedAccounts();
    const unnamedAccounts = await getUnnamedAccounts();
    const users = await setupUsers(unnamedAccounts, { token });
    const deployer = await setupUser(accounts.admin, { token });
    return { users, deployer, token };
});
