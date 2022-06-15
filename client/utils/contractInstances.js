// UTILS
import Web3 from "./web3";

// CONTRACTS
import { contracts } from "../contracts";

export default class Contracts {
  static _instances;

  static get instances() {
    if (Contracts._instances) return Contracts._instances;

    const web3 = Web3.instance;
    const ContractInstances = {};
    web3.eth
      .getPastLogs({address: "0x7bE3C2F8476610C6d206794b3DA7f98294538839"})
      .then((dta) => console.log(dta))
      .catch((err) => console.log(err));

	// console.log(web3.eth);
    contracts.forEach((contract) => {
      ContractInstances[contract.name] = new web3.eth.Contract(
        contract.abi,
        contract.address
      );
    });
    Contracts._instances = ContractInstances;
    return Contracts._instances;
  }
}
