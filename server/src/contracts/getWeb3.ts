import setupProvider, { setupSigner } from './ethers';

import { PriToken, Ride } from './types';
import * as PriTokenABI from './abis/PriToken.json';
import * as RideABI from './abis/Ride.json';

import { ethers } from 'ethers';

export async function getWeb3() {
  const rpc = process.env.RPC;
  const pKey = process.env.PVT_KEY;

  const provider = await setupProvider(rpc);
  const signer = await setupSigner(pKey, provider);

  const contractAddress = {
    PriToken: '0xE6F9Ab702fe8dC153EF20291E0B2d84354734779',
    Ride: '0x7B643C4FAF5a1a7EA28d1b99f96BBdFC160830eb',
  };

  return {
    PriToken: new ethers.Contract(
      contractAddress.PriToken,
      PriTokenABI.abi,
      signer,
    ) as PriToken,

    Ride: new ethers.Contract(
      contractAddress.Ride,
      RideABI.abi,
      signer,
    ) as Ride,
  };
}
