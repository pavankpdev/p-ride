const hre = require("hardhat");

async function main() {

  const DriverContract = await hre.ethers.getContractFactory("Driver");
  const drivers = await DriverContract.deploy();

  await drivers.deployed();

  console.log("Customer contract deployed to:", drivers.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
