const hre = require("hardhat");

async function main() {

  const VehicleContract = await hre.ethers.getContractFactory("Vehicle");
  const vehicles = await VehicleContract.deploy();

  await vehicles.deployed();

  console.log("Ride contract deployed to:", vehicles.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
