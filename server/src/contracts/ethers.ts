import { ethers } from 'ethers';

/**
 * Setup ethers with provider
 * ___________________________________
 * @param rpcURL - Eth/Poly/BSC RPC URL
 * @returns rpc provider
 */
const setupProvider = async (rpcURL: string) => {
  // setup ethers with bsc provider
  const provider = new ethers.providers.JsonRpcProvider(rpcURL);
  const currentBlock = await provider.getBlockNumber();
  console.log(`✅ Current Block Number : ${currentBlock}`);
  return provider;
};

/**
 * Setup ethers signer with private key
 * ____________________________________
 * @param pKey - Private Key for admin
 * @param provider - rpc provider
 */
const setupSigner = async (
  pKey: string,
  provider: ethers.providers.JsonRpcProvider,
) => {
  // setup ethers with private key
  const signer = new ethers.Wallet(pKey, provider);
  console.log(`✅ Signer Address : ${signer.address}`);
  return signer;
};

// @private internal use only
// get Contract JSON from contract name
// eslint-disable-next-line @typescript-eslint/no-var-requires
const _getContractABIFromJSON = (contractName: string): any =>
  require(`../contracts/abis/${contractName}.json`);

/**
 * get Contract instance from contract name
 * ___________________________________________
 * @param wallet - ethers signer
 * @returns signer instance
 * @example
 * const contract = await getContract(signer, 'BSC_CONTRACT_NAME', '0x0000...0000')
 */
const getContract = (
  wallet: ethers.Wallet,
  contractName: string,
  contractAddress: string,
): ethers.Contract => {
  const contractJson = _getContractABIFromJSON(contractName);
  return new ethers.Contract(contractAddress, contractJson.abi, wallet);
};

export default setupProvider;
export { setupSigner, getContract };
