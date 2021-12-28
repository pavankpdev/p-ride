const hre = require("hardhat");

async function main() {
  const CustomerContract = await hre.ethers.getContractFactory("Customer");
  const customer = await CustomerContract.deploy();

  await customer.deployed();

  console.log("Customer contract deployed to:", customer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
