// hardhat.config.js
require("@nomiclabs/hardhat-waffle");
const {utils} = require("ethers");
const fs = require("fs");

const {isAddress, getAddress, formatUnits, parseUnits} = utils;

// Select the network you want to deploy to here:
const defaultNetwork = "optimismSepolia";

function mnemonic() {
    try {
        return fs.readFileSync("./mnemonic.txt").toString().trim();
    } catch (e) {
        if (defaultNetwork !== "localhost") {
            console.log("☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`.")
        }
    }
    return "";
}

module.exports = {
    defaultNetwork,

    networks: {
        localhost: {
            url: "http://localhost:8545",
        },
        baseSepolia: {
            url: "https://base-sepolia.api.onfinality.io/rpc?apikey=API_KEY",
            accounts: {
                mnemonic: mnemonic(),
            },
            chainId: 84532,
        },
        optimismSepolia: {
            url: "https://optimism-sepolia.infura.io/v3/API_KEY",
            accounts: {
                mnemonic: mnemonic(),
            },
            chainId: 11155420,
        },
        rinkeby: {
            url: "https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID",
            accounts: {
                mnemonic: mnemonic(),
            },
        },
        mainnet: {
            url: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",
            accounts: {
                mnemonic: mnemonic(),
            },
        },
        ropsten: {
            url: "https://ropsten.infura.io/v3/YOUR_INFURA_PROJECT_ID",
            accounts: {
                mnemonic: mnemonic(),
            },
        },
        xdai: {
            url: 'https://dai.poa.network',
            gasPrice: 1000000000,
            accounts: {
                mnemonic: mnemonic(),
            },
        },
    },
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
};
