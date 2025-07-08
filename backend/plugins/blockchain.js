// backend/plugins/blockchain.js
const path = require('path');
const fs = require('fs');
const { ethers } = require('ethers');

const artifactPath = path.join(__dirname, '../abi/TournamentScores.json');
const contractJson = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
const abi = contractJson.abi;

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const PROVIDER_URL = 'https://api.avax-test.network/ext/bc/C/rpc';
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

async function submitScore(score, winnerName, scoreDetail) {
  try {
    console.log('[blockchain] submitScore called with:', score, winnerName, scoreDetail);
    const tx = await contract.submitScore(score, winnerName, scoreDetail);
    console.log('[blockchain] Transaction sent, hash:', tx.hash);
    const receipt = await tx.wait();
    console.log('[blockchain] Transaction mined, block:', receipt.blockNumber);
    return tx.hash;
  } catch (err) {
    console.error('[blockchain] Error in submitScore:', err);
    throw err;
  }
}

async function getScoresCount() {
  return await contract.getScoresCount();
}

async function getScore(index) {
  return await contract.getScore(index);
}

async function getAllScores() {
  const count = await getScoresCount();
  const scores = [];
  for (let i = 0; i < count; i++) {
    const [player, score, timestamp] = await getScore(i);
    scores.push({ player, score: score.toString(), timestamp: Number(timestamp) });
  }
  return scores;
}

module.exports = { submitScore, getAllScores };
