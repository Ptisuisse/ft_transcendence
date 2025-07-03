// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const TournamentScores = await hre.ethers.getContractFactory("TournamentScores");
  const tournamentScores = await TournamentScores.deploy();

  await tournamentScores.waitForDeployment();

  console.log("TournamentScores deployed to:", tournamentScores.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });