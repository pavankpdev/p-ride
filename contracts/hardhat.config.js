require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://speedy-nodes-nyc.moralis.io/e1ab103eda1ef6147621f342/eth/ropsten",
      accounts: ["0fd3cfa739ef020390437bb90a9ba02accac47053a6a8b8e0acd6caf80dc7718"],
    }
  },
  etherscan: {
    apiKey: "37PRWEFHJCG43Z1SEYBNYRBGJPTP4KSE85"
  }
};
