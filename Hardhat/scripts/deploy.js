const hre = require("hardhat");

async function main() {
  
  const BottleStore = await hre.ethers.deployContract("BottleStore")
  console.log("Deploying Contract...")
  await BottleStore.waitForDeployment();
  console.log(`Deployed to ${BottleStore.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })