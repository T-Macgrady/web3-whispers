require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "localhost",
  networks: {
    localhost: {},
    goerli: {
      url: process.env.GOERLI_INFURA_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    ropsten: {
      url: process.env.ROPSTEN_INFURA_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    rinkeby: {
      url: process.env.RINKEBY_INFURA_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    kovan: {
      url: process.env.KOVAN_INFURA_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    op_kovan: {
      url: process.env.OP_KOVAN_INFURA_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    optimism: {
      url: process.env.OPTIMISM_INFURA_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    hardhat: {
      accounts: {
        mnemonic: 'test test test test test test test test test test test junk',
        initialBaseBalance: 5000000000000000000000 // 初始金额更改为5000个ETH
      }
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
}
