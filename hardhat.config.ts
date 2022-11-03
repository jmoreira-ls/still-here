require("@matterlabs/hardhat-zksync-deploy");
require("@matterlabs/hardhat-zksync-solc");
require("@typechain/hardhat");

const zkSyncDeploy =
  process.env.NODE_ENV == "test"
    ? {
        zkSyncNetwork: "http://localhost:3050",
        ethNetwork: "http://localhost:8545",
      }
    : {
        zkSyncNetwork: "https://zksync2-testnet.zksync.dev",
        ethNetwork: "goerli",
      };

module.exports = {
  zksolc: {
    version: "1.2.0",
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
      },
      experimental: {
        dockerImage: "matterlabs/zksolc",
        tag: "v1.2.0",
      },
    },
  },
  zkSyncDeploy,
  networks: {
    hardhat: {
      zksync: true,
    },
  },
  typechain: {
    outDir: "typechain",
  },
  solidity: {
    version: "0.8.16",
  },
};
