import { ethers } from "ethers";

// Adresse du contrat en dur (testnet)
const CONTRACT_ADDRESS = "0xe08C18591D6865C65512DD6350a4cFF6D47ED1e9";

const abi = [
  "function addScore(uint256 tournamentId, uint256 score) public",
  "function getAllScores(uint256 tournamentId) public view returns (tuple(address player, uint256 score, uint256 timestamp)[])"
];

export async function sendScoreToBlockchain(tournamentId: number, score: number) {
  if (!(window as any).ethereum) {
    alert("Metamask requis pour enregistrer le score sur la blockchain !");
    return;
  }
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

  const tx = await contract.addScore(tournamentId, score);
  await tx.wait();
  alert("Score enregistré sur la blockchain !");
}

export async function fetchScoresFromBlockchain(tournamentId: number) {
  const provider = new ethers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc");
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
  return await contract.getAllScores(tournamentId);
}