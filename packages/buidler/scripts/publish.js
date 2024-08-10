const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const {network} = require("hardhat");

const publishDir = path.resolve(__dirname, "../../vue-src/src/contracts");

function publishContract(contractName) {
    console.log(
        "Publishing",
        chalk.cyan(contractName),
        "to",
        chalk.yellow(publishDir)
    );
    try {
        const artifactPath = path.resolve(
            __dirname,
            `../artifacts/contracts/${contractName}.sol/${contractName}.json`
        );

        if (!fs.existsSync(artifactPath)) {
            console.log(chalk.red(`Artifact not found for ${contractName}`));
            return false;
        }

        const contractArtifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
        const addressPath = path.resolve(
            __dirname,
            `../artifacts/${contractName}.address`
        );

        if (!fs.existsSync(addressPath)) {
            console.log(chalk.red(`Address not found for ${contractName}`));
            return false;
        }

        const address = fs.readFileSync(addressPath, "utf8").trim();

        fs.writeFileSync(
            `${publishDir}/${contractName}.address.ts`,
            `export default "${address}";`
        );
        fs.writeFileSync(
            `${publishDir}/${contractName}.abi.ts`,
            `export default ${JSON.stringify(contractArtifact.abi, null, 2)};`
        );
        fs.writeFileSync(
            `${publishDir}/${contractName}.bytecode.ts`,
            `export default "${contractArtifact.bytecode}";`
        );

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function main() {
    if (!fs.existsSync(publishDir)) {
        fs.mkdirSync(publishDir, {recursive: true});
    }
    const finalContractList = [];
    const contractsDir = path.resolve(__dirname, "../contracts");

    fs.readdirSync(contractsDir).forEach((file) => {
        if (file.endsWith(".sol")) {
            const contractName = file.replace(".sol", "");
            // Add contract to list if publishing is successful
            if (publishContract(contractName)) {
                finalContractList.push(contractName);
            }
        }
    });

    fs.writeFileSync(
        `${publishDir}/contracts.ts`,
        `export default ${JSON.stringify(finalContractList)};`
    );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
