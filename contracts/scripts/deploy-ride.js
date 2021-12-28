const hre = require("hardhat");

async function main() {

  const DriverContract = await hre.ethers.getContractFactory("Ride");
  const drivers = await DriverContract.deploy();

  await drivers.deployed();

  console.log("Ride contract deployed to:", drivers.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
