const hre = require("hardhat");

async function main() {
  const PRIToken = await hre.ethers.getContractFactory("PRIToken");
  const token = await PRIToken.deploy();

  await token.deployed();

  console.log("PRI token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
