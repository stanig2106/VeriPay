// deploy.js
const fs = require("fs");
const chalk = require("chalk");
const {ethers, run, network} = require("hardhat");
const {utils} = require("ethers");

async function main() {
    console.log("📡 Deploy \n");

    let args = [];
    if (network.name === "baseSepolia") {
        args = readArgumentsFile("VeriPayBaseContract");
    } else if (network.name === "optimismSepolia") {
        args = readArgumentsFile("VeriPayOpContract")
    } else {
        throw new Error(`Unsupported network: ${network.name}`);
    }
    await deploy("VeriPayContract", args);
}

function readArgumentsFile(contractName) {
    let args = [];
    try {
        const argsFile = `./contracts/${contractName}.args`;
        if (fs.existsSync(argsFile)) {
            args = JSON.parse(fs.readFileSync(argsFile));
        }
    } catch (e) {
        console.log(e);
    }

    return args;
}


async function deploy(name, _args) {
    const args = _args || [];

    console.log(` 🛰  Deploying ${name}`);
    const contractArtifacts = await ethers.getContractFactory(name);
    const contract = await contractArtifacts.deploy(...args);
    await contract.deployed();
    console.log(
        " 📄",
        chalk.cyan(name),
        "deployed to:",
        chalk.magenta(contract.address),
        "\n"
    );
    fs.writeFileSync(`artifacts/${name}.address`, contract.address);
    console.log(
        "💾  Artifacts (address, abi, and args) saved to: ",
        chalk.blue("packages/buidler/artifacts/"),
        "\n"
    );
    return contract;
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
