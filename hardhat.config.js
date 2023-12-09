require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
// require('hardhat-deploy');
// import dotenv from "dotenv";
require("dotenv");


// dotenv.config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.9',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.13',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      // gas: 10000000000,
      allowUnlimitedContractSize: true,
      
    },
    // mumbaitest: {
    //   url: "https://matic-mumbai.chainstacklabs.com",
    //   accounts: [`0x${process.env.PVTKEY}`],
    //   gasPrice: 500000000
    // },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    // rinkeby: {
    //   url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
    //   accounts: {
    //      mnemonic: process.env.TESTNET_MNEMONIC,
    //   },
    // },
    // testnet: {
    //   url: "https://data-seed-prebsc-1-s1.binance.org:8545",
    //   chainId: 97,
    //   // gasPrice: 20000000000,
    //   accounts: {
    //     mnemonic: [`0x95585dbc649088cbaedff1311270df683fbe8a8b34f439cb8a8279880ab339a7`],
    //   },
    // },
  },
  namedAccounts: {
    deployer: 0
  },
  etherscan: {  // copy the Etherscan object from the verify Contracts secion on Dashboard 
    apiKey: {
      buildbear: "verifyContract",
    },
    customChains: [
      {
        network: "buildbear",
        chainId: 1,
        urls: {
          apiURL: "https://rpc.buildbear.io/verify/etherscan/grotesque-palpatine-970c2c15",
          browserURL: "https://explorer.buildbear.io/grotesque-palpatine-970c2c15",
        },
      },
    ],
  },
};
