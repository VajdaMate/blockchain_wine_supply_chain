const hre = require("hardhat");

async function main() {
  
  const FactoryContract = await hre.ethers.deployContract("BottleFactory")
  console.log("Deploying Contract...")
  await FactoryContract.waitForDeployment();
  console.log(`Deployed to ${FactoryContract.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })