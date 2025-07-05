// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const TournamentScores = await hre.ethers.getContractFactory("TournamentScores");
  const contract = await TournamentScores.deploy();
  await contract.waitForDeployment();
  // Ethers v6: l'adresse du contrat est dans contract.target
  console.log("TournamentScores deployed to:", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});