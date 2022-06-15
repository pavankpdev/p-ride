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
      accounts: [
        "624a1fee511e3da76182f629674552d0556cd3fe5dcaa7fe4aab4b9e8e7d20b9",
      ],
    },
    mumbai: {
      url: `https://speedy-nodes-nyc.moralis.io/6a68cf0be9afb9582dc98bd1/polygon/mumbai`,
      chainId: 80001,
      accounts: ["624a1fee511e3da76182f629674552d0556cd3fe5dcaa7fe4aab4b9e8e7d20b9",],
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
};
export default config;
