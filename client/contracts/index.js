import Web3 from './web3';
import {abi as PriTokenABI} from './abis/PriToken.json'
import {abi as RideABI} from './abis/Ride.json'

const contractAddress = {
	PriToken: '0xE6F9Ab702fe8dC153EF20291E0B2d84354734779',
	Ride: '0x7B643C4FAF5a1a7EA28d1b99f96BBdFC160830eb',
};

const index = [
	{
		name: 'PriToken',
		abi: PriTokenABI,
		address: contractAddress.PriToken
	},
	{
		name: 'Ride',
		abi: RideABI,
		address: contractAddress.Ride
	},
];

export default class Contracts {
	static _instances;

	static get instances() {
		if (Contracts._instances && Web3.isEnabledInBrowser()) return Contracts._instances;

		const web3 = Web3.instance;
		const ContractInstances = {};
		index.forEach((contract) => {
			ContractInstances[contract.name] = new web3.eth.Contract(
				contract.abi,
				contract.address
			);
		});
		Contracts._instances = ContractInstances;
		return Contracts._instances;
	}
}
