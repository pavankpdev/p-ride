# Pride Smart contracts

This directory contains the smart contract of this project, The Smart contracts here are compiled and deployed via [hardhat](https://hardhat.org/getting-started/). 

## Install hardhat
```shell
npm i --save-dev hardhat
```
or
```shell
yarn add -D hardhat
```

## Compile a contract

```shell
npx hardhat compile
```

## deploy a contract
To deploy a contract make sure the script is ready. 

```shell
 npx hardhat run scripts/[filename].js --network ropsten
```