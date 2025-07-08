// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const TournamentScores = await hre.ethers.getContractFactory("TournamentScores");
  const contract = await TournamentScores.deploy();
  await contract.waitForDeployment();
  console.log("TournamentScores deployed to:", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});