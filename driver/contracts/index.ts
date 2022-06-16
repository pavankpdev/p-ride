import * as PriTokenAbi from './abis/PriToken.json'
import * as RideAbi from './abis/Ride.json'

import {PriToken, Ride} from "./types";

export interface ContractConfig {
    name: string;
    address: string;
    abi: any;
}

export const contractAddress = {
    PriToken: '0xE6F9Ab702fe8dC153EF20291E0B2d84354734779',
    Ride: '0x7B643C4FAF5a1a7EA28d1b99f96BBdFC160830eb',
};

export const contracts: ContractConfig[] = [
    {
        name: 'PriToken',
        abi: PriTokenAbi.abi,
        address: contractAddress.PriToken as string,
    },
    {
        name: 'Ride',
        abi: RideAbi.abi,
        address: contractAddress.Ride as string,
    },
];

export interface ContractInstances {
    PriToken: PriToken;
    Ride: Ride;
}
