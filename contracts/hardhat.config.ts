require('dotenv').config()
require('solidity-coverage')

import { HardhatUserConfig } from "hardhat/types";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "@typechain/hardhat";


const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.0",
  },
  networks: {
    ropsten: {
      url: "https://speedy-nodes-nyc.moralis.io/e1ab103eda1ef6147621f342/eth/ropsten",
      accounts: [process.env.DEPLOYER_PRIVATE_KEY as string],
    },
    mumbai: {
      url: `https://rpc-mumbai.maticvigil.com/v1/f79235594e1c3bda499c75b6f0338cc703995047`,
      chainId: 80001,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY as string],
    },
  },
  namedAccounts: {
    admin: 0,
  },
  paths: {
    sources: "src",
  },
  typechain: {
    outDir: "src/types",
    target: "ethers-v5",
  },
  etherscan: {
    apiKey: process.env.EXPLORER_API_KEY || "",
  },
};
export default config;
