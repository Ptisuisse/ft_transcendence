require("dotenv").config({ path: "../.env" });
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");

module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {},
  },
  networks: {
    fuji: {
      url: process.env.FUJI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      avalancheFujiTestnet: "placeholder" // n'importe quelle string
    },
    customChains: [
      {
        network: "avalancheFujiTestnet",
        chainId: 43113,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan",
          browserURL: "https://testnet.snowtrace.io"
        }
      }
    ]
  }
};
