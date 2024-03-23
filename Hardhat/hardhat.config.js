require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "localhost",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
  },
  gasReporter: {
      enabled: true,
      currency: "USD",
      outputFile: "gas-report.txt",
      noColors: true,
      coinmarketcap:"045207fe-00f8-4495-89e8-faa061578c2d",
  },

  solidity: "0.8.24",
  paths: {
    artifacts: "./artifacts",
  },
};